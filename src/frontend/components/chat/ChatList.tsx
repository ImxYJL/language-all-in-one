'use client';

import { useChatPageState } from '@/frontend/providers/ChatPageStateProvider';
import ChatItem from './ChatItem';

const ChatList = () => {
  const { chats, currentChatId } = useChatPageState();

  return (
    <section>
      <h3 className="mb-3 px-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">대화 목록</h3>
      <li className="list-none space-y-2">
        {chats.length === 0 ? (
          <p className="px-2 py-4 text-center text-sm text-gray-400">아직 대화가 없습니다</p>
        ) : (
          chats.map((chat) => <ChatItem chat={chat} isCurrentChatId={currentChatId === chat.id} key={chat.id} />)
        )}
      </li>
    </section>
  );
};

export default ChatList;
