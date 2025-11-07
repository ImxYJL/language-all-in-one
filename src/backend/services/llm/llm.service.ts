import { BaseLlm, ConversationMessage } from '@/backend/clients/llm/baseLlm';
import { PROMPT, SUMMARY_INPUT } from '@/backend/clients/llm/gemini/gemini.constants';
import { AppError, isNonExist, isUpstreamError } from '@/backend/error';
import { SupabaseClient } from '@supabase/supabase-js';
import { Conversation, Message } from '@/backend/models/llm/types';
import {
  createMessage,
  createSummary,
  findConversationById,
  getMessages,
} from '@/backend/models/llm/gemini/conversation.model';

export async function getValidConversation(db: SupabaseClient, userId: string, id: string): Promise<Conversation> {
  try {
    const chat = await findConversationById(db, id);
    if (chat.user_id !== userId) {
      throw AppError.forbidden(undefined, '접근 권한이 없습니다.');
    }

    return chat;
  } catch (err) {
    if (isNonExist(err)) throw AppError.notFound(undefined, '존재하지 않는 대화입니다.');
    throw err;
  }
}

export async function getValidMessages(db: SupabaseClient, userId: string, id: string): Promise<Message[]> {
  try {
    await getValidConversation(db, userId, id); // 소유자 검증

    return await getMessages(db, id);
  } catch (err) {
    throw err;
  }
}

function convertToContext(dbMessages: Message[]): ConversationMessage[] {
  return dbMessages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));
}

function createLlmStream(llm: BaseLlm, contextMessages: ConversationMessage[], conversationPrompt: string | undefined) {
  try {
    const stream = llm.chat(contextMessages, {
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
  save: (fullResponse: string) => Promise<void>;
};

export async function getMessageStream(
  db: SupabaseClient,
  llm: BaseLlm,
  input: string,
  conversation: Conversation,
): Promise<LlmMessageStream> {
  const conversationId = conversation.id;
  const userId = conversation.user_id;
  const isSummary = input === SUMMARY_INPUT;

  // 컨텍스트 준비 및 스트림 생성
  const dbMessages = await getMessages(db, conversationId);
  const contextMessages = convertToContext(dbMessages);
  contextMessages.push({
    // 현재 유저가 입력한 메세지를 새 컨텍스트에 추가 (LLM 전달용)
    role: 'user',
    content: input,
  });
  await createMessage(db, conversationId, 'user', input); // DB에 현재 유저 입력을 저장

  const conversationPrompt = isSummary ? PROMPT.summary : undefined;
  const stream = createLlmStream(llm, contextMessages, conversationPrompt);

  // 라우터에서 응답을 받고 수행할 응답 저장 로직
  const save = async (fullResponse: string) => {
    await createMessage(db, conversationId, 'assistant', fullResponse);
    if (isSummary) await createSummary(db, userId, conversationId, fullResponse);
  };

  return { stream, save };
}
