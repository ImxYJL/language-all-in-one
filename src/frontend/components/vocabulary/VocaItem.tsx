import { EllipsisVertical, Star } from 'lucide-react';
import StarButton from './StarButton';
import { ItemType } from '@/types/vocabulary';
import React from 'react';

interface VocaItemProps {
  id: string;
  itemType: ItemType;
  voca: string;
  meaning: string;
  isFavorite: boolean;
  example?: string; // 배열로?
}

const VocaItem = ({ id, voca, meaning, isFavorite, example, itemType }: VocaItemProps) => {
  return (
    <li className="relative flex-1 list-none rounded-lg border border-gray-300 bg-white p-4">
      <div className="absolute top-4 right-4 flex gap-2">
        <StarButton id={id} isFavorite={isFavorite} itemType={itemType} />
        {/* <button type="button">
          <EllipsisVertical className="h-4 w-4" />
        </button> */}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-primary text-lg font-bold">{voca}</p>
        {meaning && <p className="text-sm text-gray-700">{meaning}</p>}
      </div>

      {/* 예문 */}
      {example && <p className="mt-2.5 rounded bg-gray-50 p-2 text-sm text-gray-600 italic">{example}</p>}
    </li>
  );
};

export default VocaItem;
