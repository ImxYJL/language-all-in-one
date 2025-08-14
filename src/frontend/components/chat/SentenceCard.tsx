import { MessageCircle } from 'lucide-react';
import { Card } from '../common';

const SentenceCard = () => {
  return (
    <Card>
      <Card.Header icon={<MessageCircle className="text-primary h-5 w-5" />} title="오늘의 문장" titleAs="h2" />
      <div className="space-y-3">
        <p className="text-lg font-medium text-gray-900">asdf</p>
        <p className="text-sm text-gray-600 italic">asdwwf</p>
      </div>
    </Card>
  );
};

export default SentenceCard;
