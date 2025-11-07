import { NextRequest, NextResponse } from 'next/server';
import { createRlsSupabase } from '@/libs/supabase/client';
import { requireAuth } from '@/backend/utils/auth/guards';
import { handleRouteError } from '@/backend/error/app';
import { getMessageStream } from '@/backend/services/llm/llm.service';
import {
  createConversation,
  createMessage,
  getConversationTitles,
} from '@/backend/models/llm/gemini/conversation.model';
import { gemini } from '@/backend/clients/llm/gemini/gemini.clients';

export async function GET(req: NextRequest) {
  try {
    const { token, authedUserInfo } = await requireAuth(req, { requireRealUser: true });
    const db = createRlsSupabase(token);

    const conversationTitles = await getConversationTitles(db, authedUserInfo.id);
    return NextResponse.json(conversationTitles);
  } catch (e) {
    return handleRouteError(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { token, authedUserInfo } = await requireAuth(req, { requireRealUser: true });
    const db = createRlsSupabase(token);

    const { input } = await req.json();

    const newConversation = await createConversation(db, authedUserInfo.id);
    const { stream, conversationId } = await getMessageStream(db, gemini, input, newConversation);

    const responseStream = new ReadableStream({
      async pull(controller) {
        let fullResponse = '';
        const encoder = new TextEncoder();

        try {
          for await (const chunk of stream) {
            controller.enqueue(encoder.encode(chunk)); // 브라우저에 전송
            fullResponse += chunk;
          }

          // 클라이언트에 청크 전송 뒤, 완성된 응답(최종본)을 저장
          await createMessage(db, conversationId, 'assistant', fullResponse);

          controller.close();
        } catch (err) {
          console.error('Stream processing error:', err);
          controller.error(err);
        }
      },

      async cancel(reason) {
        console.warn('Client aborted stream:', reason);

        // NOTE: 추후 타입 에러 터질수도 있음
        const iterator = stream as unknown as AsyncIterator<string>;
        if (iterator && typeof iterator.return === 'function') {
          await iterator.return();
        }
      },
    });

    return new Response(responseStream, {
      headers: {
        'X-Conversation-Id': newConversation.id,
        'X-Conversation-Title': newConversation.title,
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch (e) {
    return handleRouteError(e);
  }
}
