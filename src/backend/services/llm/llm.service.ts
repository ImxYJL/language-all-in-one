import { BaseLlm, ConversationMessage } from '@/backend/clients/llm/baseLlm';
import { PROMPT, SUMMARY_INPUT } from '@/backend/clients/llm/gemini/gemini.constants';
import { AppError, isNonExist, isUpstreamError } from '@/backend/error';
import { SupabaseClient } from '@supabase/supabase-js';
import { Message } from '@/backend/models/llm/types';
import {
  createConversation,
  createMessage,
  findConversationById,
  getMessages,
} from '@/backend/models/llm/gemini/conversation.model';

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
  conversationId: string;
};

export async function getMessageStream(
  db: SupabaseClient,
  llm: BaseLlm,
  input: string,
  userId: string,
  id?: string,
): Promise<LlmMessageStream> {
  const conversationId = id ? await getConversationId(db, userId, id) : undefined;

  // 컨텍스트 준비 및 스트림 생성
  const dbMessages = conversationId ? await getMessages(db, conversationId) : [];
  const contextMessages = convertToContext(dbMessages);

  const conversationPrompt = input === SUMMARY_INPUT ? PROMPT.summary : undefined;

  // 현재 유저가 입력한 메세지를 새 컨텍스트에 추가 (LLM 전달용)
  // 아니잠만ㅋㅋㅋㅋㅋㅋ 얘는 DB입력 따라가서 DB타입 맞춰야하네...

  // [현재 로직 정리] chat에는 꼭 추상화된 타입 써야 함. (추상화 + role과 content만 있음)
  // 근데 db에서 갓 가져온 메세지 타입은 메타데이터(id 등)이 붙어 있음.
  // 그래서 db -> 추상화 타입 변환된 contextMessages -> 여기다 유저 입력 push -> 이걸로 chat 넣어야 함.
  contextMessages.push({
    role: 'user',
    content: input,
  });

  const stream = createLlmStream(llm, contextMessages, conversationPrompt);

  const finalConversationId = conversationId ?? (await createConversation(db, userId)).id;
  await createMessage(db, finalConversationId, 'user', input); // DB 저장용 유저 입력 저장

  return { stream, conversationId: finalConversationId };
}
