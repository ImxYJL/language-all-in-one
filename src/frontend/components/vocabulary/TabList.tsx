import { BookOpen, MessageSquare } from 'lucide-react';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface TabProps {
  isSelected: boolean;
  onClick: () => void;
}

const Tab = ({ isSelected, onClick, children }: PropsWithChildren<TabProps>) => {
  return (
    <li>
      <button
        type="button"
        tabIndex={isSelected ? 0 : -1}
        onClick={onClick}
        className={clsx(
          'inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors',
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
  className?: string;
}

const TabList = ({ isWordTab, toggleTab, className }: TabListProps) => {
  return (
    <ul className={clsx('inline-flex items-center gap-1 rounded-xl bg-neutral-100 p-1', className)}>
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
