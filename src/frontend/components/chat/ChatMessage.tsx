import { Message } from '@/backend/models/llm/types';
import { LoadingBar } from '@/frontend/components/common';

type ChatMessageProps = Omit<Message, 'created_at' | 'conversation_id'> & {
  isLoading: boolean;
};

const ChatMessage = ({ id, role, content, isLoading }: ChatMessageProps) => {
  return isLoading ? (
    <LoadingBar />
  ) : (
    <div key={id} className={`flex gap-3 ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 sm:max-w-[70%] ${
          role === 'user' ? 'bg-primary ml-auto text-white' : 'border border-gray-200 bg-gray-100 text-gray-900'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
