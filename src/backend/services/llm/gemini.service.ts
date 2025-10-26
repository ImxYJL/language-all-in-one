import { ConversationMessage } from '@/backend/clients/llm/baseLlm';
import { PROMPT, SUMMARY_INPUT } from '@/backend/clients/llm/gemini/gemini.constants';
import { AppError, isNonExist, isUpstreamError } from '@/backend/error';
import { llm as gemini } from '@/backend/clients/llm/gemini/gemini.clients';
import { GeminiRole, Message } from '@/backend/models/llm/types';
import {
  createConversation,
  createMessage,
  findConversationById,
  getMessages,
} from '@/backend/models/llm/gemini/conversation.model';
import { SupabaseClient } from '@supabase/supabase-js';

async function getConversationId(db: SupabaseClient, userId: string, id: string): Promise<string> {
  try {
    const chat = await findConversationById(db, id);
    if (chat.user_id !== userId) {
      throw AppError.forbidden(undefined, '접근 권한이 없습니다.');
    }

    return chat.id;
  } catch (err) {
    if (isNonExist(err)) {
      throw AppError.notFound(undefined, `${id}라는 대화를 찾을 수 없습니다.`);
    }
    throw err;
  }
}

export async function getConversations() {}

function convertToLlmMessages(dbMessages: Message<GeminiRole>[]): ConversationMessage[] {
  return dbMessages.map((msg) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    content: msg.content,
  }));
}

function createLlmStream(contextMessages: ConversationMessage[], conversationPrompt: string | undefined) {
  try {
    const stream = gemini.chat(contextMessages, {
      conversationPrompt,
    });
    return stream;
  } catch (err) {
    if (isUpstreamError(err)) {
      throw AppError.internal(undefined, 'AI 입력을 받던 중 문제가 발생했습니다.');
    }
    throw err;
  }
}

export type LlmMessageStream = {
  stream: AsyncIterable<string>;
  conversationId: string;
};

export async function getMessageStream(
  db: SupabaseClient,
  input: string,
  userId: string,
  id?: string,
): Promise<LlmMessageStream> {
  const conversationId = id ? await getConversationId(db, userId, id) : undefined;

  // 컨텍스트 준비 및 스트림 생성
  const dbMessages = conversationId ? await getMessages(db, conversationId) : [];
  const contextMessages = convertToLlmMessages(dbMessages);
  const conversationPrompt = input === SUMMARY_INPUT ? PROMPT.summary : undefined;

  const stream = createLlmStream(contextMessages, conversationPrompt);

  const finalConversationId = conversationId ?? (await createConversation(db, userId)).id;
  await createMessage(db, finalConversationId, 'user', input);

  return { stream, conversationId: finalConversationId };
}
