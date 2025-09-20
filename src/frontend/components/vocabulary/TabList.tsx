'use client';

import { BookOpen, MessageSquare } from 'lucide-react';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface TabProps {
  isSelected: boolean;
  onClick: () => void;
}

const Tab = ({ isSelected, onClick, children }: PropsWithChildren<TabProps>) => {
  return (
    <li className="min-w-0 flex-1 list-none">
      <button
        type="button"
        tabIndex={isSelected ? 0 : -1}
        onClick={onClick}
        className={clsx(
          'inline-flex w-full items-center justify-center gap-2 rounded-md px-2 py-3 text-sm transition-colors',
          isSelected
            ? 'bg-[var(--color-primary)] text-white shadow-sm'
            : 'text-neutral-600 hover:bg-white hover:text-neutral-900',
        )}
      >
        {children}
      </button>
    </li>
  );
};

interface TabListProps {
  isWordTab: boolean;
  toggleTab: () => void;
}

const TabList = ({ isWordTab, toggleTab }: TabListProps) => {
  return (
    <ul className="m-2 flex w-full gap-1 rounded-xl bg-neutral-100 p-1.5">
      <Tab isSelected={isWordTab} onClick={toggleTab}>
        <>
          <BookOpen className="h-4 w-4" />
          <span>단어</span>
        </>
      </Tab>

      <Tab isSelected={!isWordTab} onClick={toggleTab}>
        <>
          <MessageSquare className="h-4 w-4" />
          <span>문장</span>
        </>
      </Tab>
    </ul>
  );
};

export default TabList;
