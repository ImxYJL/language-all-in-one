'use client';

import { BookOpen } from 'lucide-react';
import { Card } from '../common';

const WordCard = () => {
  return (
    <Card>
      <Card.Header icon={<BookOpen className="text-primary h-5 w-5" />} title="오늘의 단어" titleAs="h2" />
      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-primary text-2xl font-bold">{'English'}</span>
          <span className="text-lg text-gray-600">{'영어'}</span>
        </div>
        {/* <p className="text-sm text-gray-600">{todayData.word.meaning}</p> */}
      </div>
    </Card>
  );
};

export default WordCard;
