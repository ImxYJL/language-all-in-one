'use client';

import { useState } from 'react';
import TabList from './TabList';
import { BottomSheet } from '../common';
import SentenceCreateForm from './SentenceCreateForm';
import WordCreateForm from './WordCreateForm';
import { Plus } from 'lucide-react';
import VocaList from './VocaList';

export interface BottomSheetFormProps {
  closeSheet: () => void;
}

const VocaContent = () => {
  const [isWordTab, setIsWordTab] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleTab = () => setIsWordTab((prev) => !prev);
  const toggleSheet = () => setIsSheetOpen((prev) => !prev);
  const toggleIsFavorite = () => setIsFavorite((prev) => !prev);

  return (
    <div>
      <TabList isWordTab={isWordTab} toggleTab={toggleTab} />

      <VocaList isFavorite={isFavorite} isWordTab={isWordTab} />

      <BottomSheet isOpen={isSheetOpen} onClose={toggleSheet}>
        {isWordTab ? <WordCreateForm closeSheet={toggleSheet} /> : <SentenceCreateForm closeSheet={toggleSheet} />}
      </BottomSheet>

      <div className="fixed right-0 bottom-0 left-0 z-5 border border-gray-300 bg-white transition-[left] duration-300 ease-in-out lg:group-data-[sidebar=open]/sidebar:left-80">
        <section className="grid h-16 grid-cols-3">
          <button
            type="button"
            onClick={toggleIsFavorite}
            className="text-primary flex flex-col items-center justify-center gap-1"
          >
            {isFavorite === true ? '전체보기' : '즐겨찾기만 보기'}
          </button>
          <button
            type="button"
            onClick={() => setIsSheetOpen(true)}
            className="text-primary flex flex-col items-center justify-center gap-1"
          >
            <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full">
              <Plus className="h-6 w-6 text-white" />
            </div>
          </button>
        </section>
      </div>
    </div>
  );
};

export default VocaContent;
