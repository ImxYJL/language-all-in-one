import { LoadingBar } from '@/frontend/components/common';

interface ChatMessageProps {
  isLoading: boolean;
  message: string;
}

const ChatMessage = ({ message, isLoading }: ChatMessageProps) => {
  return isLoading ? (
    <LoadingBar />
  ) : (
    <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 sm:max-w-[70%] ${
          message.role === 'user' ? 'bg-primary ml-auto text-white' : 'border border-gray-200 bg-gray-100 text-gray-900'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
