import { NextRequest } from 'next/server';
import { createRlsSupabase } from '@/libs/supabase/client';
import { requireAuth } from '@/backend/utils/auth/guards';
import { handleRouteError } from '@/backend/error/app';
import { getMessageStream, getValidConversation } from '@/backend/services/llm/llm.service';
import { gemini } from '@/backend/clients/llm/gemini/gemini.clients';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { token, authedUserInfo } = await requireAuth(req, { requireRealUser: true });
    const db = createRlsSupabase(token);

    const { id } = params;
    const { input } = await req.json();

    const conversation = await getValidConversation(db, authedUserInfo.id, id);
    const { stream, save } = await getMessageStream(db, gemini, input, conversation);

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
          await save(fullResponse);

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
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch (e) {
    return handleRouteError(e);
  }
}
