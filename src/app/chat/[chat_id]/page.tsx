import { ChatContent, ChatInput } from '@/frontend/components/chat';

// 스크롤 부분: chatId가 있으면 ChatSection, 없으면 WelcomeSection
// 고정 부분: ChatInput
// input 상태값(state: client)으로 서버에 제출, 그 로딩 상태와 응답값 필요

type ChatDetailPageParams = Promise<{ chat_id: string }>;

async function ChatDetailPage(params: ChatDetailPageParams) {
  const { chat_id } = await params;
  const chatId = Number(chat_id);

  return (
    <>
      <ChatContent />
      <ChatInput />
    </>
  );
}

export default ChatDetailPage;
