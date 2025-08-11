import { MessageSquare, Trash2 } from 'lucide-react';
import { Button } from '../common';
import { useChatPageState } from '@/frontend/providers/ChatPageStateProvider';

interface ChatItemProps {
  chat: any;
  isCurrentChatId: boolean;
}

const ChatItem = ({ chat, isCurrentChatId }: ChatItemProps) => {
  // currentChatId는 있을수도 없을수도...(다른 페이지면 없음, 클릭한 거 없을 때도)
  const { setCurrentChatId, deleteChat } = useChatPageState();

  return (
    <li
      key={chat.id}
      className={`group flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-all duration-200 ${
        isCurrentChatId
          ? 'from-primary/8 to-primary/4 border-primary/15 border bg-gradient-to-r shadow-sm'
          : 'hover:from-primary/4 hover:to-primary/2 hover:bg-gradient-to-r'
      }`}
      onClick={() => {
        setCurrentChatId(chat.id);
      }}
    >
      <MessageSquare
        className={`h-4 w-4 flex-shrink-0 ${
          isCurrentChatId ? 'text-primary/80' : 'group-hover:text-primary/60 text-gray-400'
        }`}
      />
      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-sm ${
            isCurrentChatId ? 'font-medium text-gray-900' : 'text-gray-700 group-hover:text-gray-800'
          }`}
        >
          {chat.title}
        </p>
        <p className="text-xs text-gray-500">{chat.createdAt.toLocaleDateString('ko-KR')}</p>
      </div>
      <Button
        className="h-6 w-6 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-50 hover:text-red-500"
        onClick={(e) => {
          e.stopPropagation();
          deleteChat(chat.id);
        }}
      >
        <Trash2 className="h-3 w-3" />
      </Button>
    </li>
  );
};

export default ChatItem;
