import { ConversationRole } from '@/backend/clients/llm/baseLlm';

export type Conversation = {
  id: string;
  created_at: string;
  title: string;
  user_id: string;
};

export type Message = {
  id: string;
  conversation_id: string;
  role: ConversationRole;
  content: string;
  created_at: string;
};

export type GeminiRole = 'user' | 'model';

export type LlmContext<Role extends string> = {
  role: Role;
  content: string;
};
