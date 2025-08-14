import { Mic, Send } from 'lucide-react';
import { Button, Input } from '@/frontend/components/common';

const ChatInput = () => {
  return (
    <div className="border-t bg-white/80 p-4 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
        <div className="flex items-end gap-3">
          <div className="relative flex-1">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="메시지를 입력하세요..."
              className="hover:border-primary focus:border-primary min-h-[48px] resize-none rounded-2xl border-2 pr-20 transition-colors"
              disabled={isLoading}
            />
            <div className="absolute top-1/2 right-2 flex -translate-y-1/2 gap-1">
              <Button
                styleType="custom"
                onClick={handleVoiceInput}
                className={`h-8 w-8 rounded-full transition-colors ${
                  isRecording ? 'bg-red-500 text-white hover:bg-red-600' : 'hover:bg-muted'
                }`}
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-primary hover:bg-primary-hover1 h-8 w-8 rounded-full transition-colors"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground mt-2 text-center text-xs">
          AI는 실수를 할 수 있습니다. 중요한 정보는 확인해 주세요.
        </p>
      </form>
    </div>
  );
};

export default ChatInput;
