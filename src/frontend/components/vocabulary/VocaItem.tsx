import { EllipsisVertical, Star } from 'lucide-react';

interface VocaItemProps {
  id: string;
  voca: string;
  meaning: string;
  isFavorite: boolean;
  example?: string; // 배열로?
}

const VocaItem = ({ voca, meaning, isFavorite, example }: VocaItemProps) => {
  return (
    <li className="relative flex-1 list-none rounded-lg border border-gray-300 bg-white p-4">
      <div className="absolute top-4 right-4 flex gap-2">
        <button type="button" className="transition-transform hover:scale-110">
          <Star
            className={`h-5 w-5 transition-colors ${
              isFavorite ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400 hover:text-yellow-400'
            }`}
          />
        </button>

        {/* <button type="button">
          <EllipsisVertical className="h-4 w-4" />
        </button> */}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-primary text-lg font-bold">{voca}</p>
        <p className="text-sm text-gray-700">{meaning}</p>
      </div>

      {/* 예문 */}
      {example && <p className="mt-2.5 rounded bg-gray-50 p-2 text-sm text-gray-600 italic">{example}</p>}
    </li>
  );
};

export default VocaItem;
