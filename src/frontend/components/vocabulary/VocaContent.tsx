'use client';

import { useState } from 'react';
import TabList from './TabList';
import { BottomSheet } from '../common';
import SentenceCreateForm from './SentenceCreateForm';
import WordCreateForm from './WordCreateForm';

const VocaContent = () => {
  const [isWordTab, setIsWordTab] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(true);

  const toggleTab = () => setIsWordTab((prev) => !prev);
  const toggleSheet = () => setIsSheetOpen((prev) => !prev);

  return (
    <div className="mx-auto max-w-4xl">
      <TabList isWordTab={isWordTab} toggleTab={toggleTab} />

      <BottomSheet isOpen={isSheetOpen} onClose={toggleSheet}>
        {isWordTab ? <WordCreateForm /> : <SentenceCreateForm />}
      </BottomSheet>
    </div>
  );
};

export default VocaContent;
