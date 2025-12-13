import { ChatContent, ChatInput } from '@/frontend/components/chat';

type ChatDetailPageParams = {
  params: Promise<{ chat_id: string }>;
};

async function ChatDetailPage({ params }: ChatDetailPageParams) {
  const { chat_id } = await params;

  return (
    <>
      <ChatContent conversationId={chat_id} />
      {/* <ChatInput /> */}
    </>
  );
}

export default ChatDetailPage;
