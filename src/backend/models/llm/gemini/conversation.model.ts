import { ConversationRole } from '@/backend/clients/llm/baseLlm';
import { SupabaseClient } from '@supabase/supabase-js';
import { Conversation, Message } from '../types';

export async function findConversationById(db: SupabaseClient, id: string): Promise<Conversation> {
  const { data, error } = await db.from('conversations').select('*').eq('id', id).single();
  if (error) throw error;

  return data;
}

export async function createConversation(db: SupabaseClient, userId: string): Promise<Conversation> {
  if (!userId) {
    throw new Error('userId is required to create a conversation.');
  }

  // NOTE: conversation_meta 테이블도 존재하지만, 정합성을 위해 rpc를 사용해야 함. 일단은 기본 테이블만 채워서 rpc 없이 간단하게 사용
  const { data, error } = await db.from('conversations').insert({ user_id: userId }).select('*').single(); // 새로 생성된 row를 즉시 반환
  if (error) throw error;

  return data;
}

export async function createMessage(
  db: SupabaseClient,
  conversationId: string,
  role: ConversationRole,
  content: string,
): Promise<Message> {
  if (!conversationId || !role || !content) {
    throw new Error('Missing required fields for creating a message.');
  }

  const { data, error } = await db
    .from('messages')
    .insert({
      conversation_id: conversationId,
      role: role,
      content: content,
    })
    .select('*')
    .single();

  if (error || !data) {
    console.error('Error creating message:', error?.message);
    throw new Error('Failed to create a new message.');
  }

  return data;
}

export async function getMessages(db: SupabaseClient, id: string): Promise<Message[]> {
  const { data, error } = await db
    .from('messages')
    .select('*')
    .eq('conversation_id', id)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching messages:', error.message);
    throw new Error('Failed to fetch messages.');
  }

  return data || [];
}

export async function createSummary(db: SupabaseClient, userId: string, id: string, content: string) {
  if (!userId || !content || !id) {
    throw new Error('Missing required fields for creating a summary.');
  }

  const { error } = await db.from('summaries').insert({
    source_conversation_id: id,
    user_id: userId,
    content: content,
  });

  if (error) {
    console.error('Error creating summary:', error?.message);
    throw new Error('Failed to create a new summary.');
  }
}

export async function getConversationTitles(db: SupabaseClient, userId: string) {
  const { data, error } = await db
    .from('conversations')
    .select('id, title, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching conversationTitles:', error.message);
    throw new Error('Failed to fetch conversationTitles.');
  }

  return data || [];
}
