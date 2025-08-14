import { ChatContent, ChatInput } from '@/frontend/components/chat';

type ChatDetailPageParams = Promise<{ chat_id: string }>;

async function ChatDetailPage(params: ChatDetailPageParams) {
  const { chat_id } = await params;
  const chatId = Number(chat_id);

  return (
    <>
      <ChatContent currentChatId={chatId} />
      <ChatInput />
    </>
  );
}

export default ChatDetailPage;
