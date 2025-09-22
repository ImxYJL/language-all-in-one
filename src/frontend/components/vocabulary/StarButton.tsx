'use client';

import { useToggleIsFavorite } from '@/frontend/queries/vocabulary/useToggleIsFavorite';
import { ItemType } from '@/types/vocabulary';
import { Star } from 'lucide-react';

interface StarButtonProps {
  id: string;
  itemType: ItemType;
  isFavorite: boolean;
}

const StarButton = ({ id, isFavorite, itemType }: StarButtonProps) => {
  const { mutate } = useToggleIsFavorite({ itemType });

  const handleFavoriteToggle = () =>
    mutate({
      id,
      isFavorite: !isFavorite,
    });

  return (
    <button
      type="button"
      className="cursor-pointer transition-transform hover:scale-110"
      onClick={handleFavoriteToggle}
    >
      <Star
        className={`h-5 w-5 transition-colors ${
          isFavorite ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400 hover:text-yellow-400'
        }`}
      />
    </button>
  );
};

export default StarButton;
