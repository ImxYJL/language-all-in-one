export type Conversation = {
  id: string;
  created_at: string;
  title: string;
  user_id: string;
};

export type Message<Role extends string> = {
  id: string;
  conversation_id: string;
  role: Role;
  content: string;
  created_at: string;
};

export type GeminiRole = 'user' | 'assistant';
