// 레이아웃??
import { Card } from '@/frontend/components/common';
import { BookOpen } from 'lucide-react';

function ChatPage() {
  return (
    <Card>
      <Card.Header icon={<BookOpen className="text-primary h-5 w-5" />} title="오늘의 단어" titleAs="h2" />
      <div>...내용...</div>
    </Card>
  );
}

export default ChatPage;
