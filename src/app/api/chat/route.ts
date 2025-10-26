import { NextRequest } from 'next/server';
import { createRlsSupabase } from '@/libs/supabase/client';
import { requireAuth } from '@/backend/utils/auth/guards';
import { handleRouteError } from '@/backend/error/app';
import { UpstreamError } from '@/backend/error';
import { getMessageStream } from '@/backend/services/llm/gemini.service';
import { createMessage } from '@/backend/models/llm/gemini/conversation.model';

// cf. id 있는 경우에는 params에서 id 추출해서 쓰면 됨
export async function POST(req: NextRequest) {
  try {
    const { dbToken, authedUserInfo } = await requireAuth(req, { requireRealUser: true });
    if (!authedUserInfo) throw new UpstreamError(401, 'Auth', 'Invalid credentials.');

    const db = createRlsSupabase(dbToken);
    const { input, id } = await req.json();

    const { stream, conversationId } = await getMessageStream(db, input, authedUserInfo.id, id);

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
          await createMessage(db, conversationId, 'model', fullResponse);

          controller.close();
        } catch (err) {
          console.error('Stream processing error:', err);
          controller.error(err);
        }
      },

      async cancel(reason) {
        console.warn('Client aborted stream:', reason);

        const iterator = stream as unknown as AsyncIterator<string>;
        if (iterator && typeof iterator.return === 'function') {
          await iterator.return();
        }
      },
    });

    return new Response(responseStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (e) {
    return handleRouteError(e);
  }
}
