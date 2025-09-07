'use client';

import { useState } from 'react';
import TabList from './TabList';

const VocaContent = () => {
  const [isWordTab, setIsWordTab] = useState(false);

  const toggleTab = () => {
    setIsWordTab((prev) => !prev);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <TabList isWordTab={isWordTab} toggleTab={toggleTab} />
    </div>
  );
};

export default VocaContent;
