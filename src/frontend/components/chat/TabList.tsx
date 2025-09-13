import { BookOpen, MessageSquare } from 'lucide-react';
import * as React from 'react';

interface TabButtonProps {
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton = ({ isSelected, onClick, children }: TabButtonProps) => {
  return (
    <button
      tabIndex={isSelected ? 0 : -1}
      onClick={onClick}
      type="button"
      data-selected={isSelected}
      className={`w/full data-[selected=true]:text-primary relative z-10 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-primary] focus-visible:ring-offset-1 focus-visible:ring-offset-white data-[selected=false]:text-[--theme-disabled-text] dark:focus-visible:ring-offset-black`}
    >
      {children}
    </button>
  );
};

interface TabListProps {
  isWordTab: boolean;
  toggleTab: () => void;
  // 선택 텍스트를 흰색으로 쓰고 싶으면 useWhiteOnPrimary를 true로
  useWhiteOnPrimary?: boolean;
}

const TabList = ({ isWordTab, toggleTab, useWhiteOnPrimary = false }: TabListProps) => {
  return (
    <div
      role="tablist"
      aria-label="단어/문장 선택"
      className={`relative grid w-full max-w-md grid-cols-2 overflow-hidden rounded-lg border border-[--color-border] bg-[oklch(0.98_0_0)] dark:bg-[oklch(0.2_0_0)]`}
    >
      {/* 선택 하이라이트(슬라이더) */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 left-0 w-1/2 rounded-md bg-[--color-primary] shadow-sm transition-transform duration-200`}
        style={{ transform: isWordTab ? 'translateX(0%)' : 'translateX(100%)' }}
      />

      {/* 탭 버튼들 */}
      <TabButton isSelected={isWordTab} onClick={toggleTab}>
        <BookOpen className={`h-4 w-4 ${useWhiteOnPrimary && isWordTab ? 'text-white' : ''}`} />
        <span className={useWhiteOnPrimary && isWordTab ? 'text-white' : undefined}>단어</span>
      </TabButton>

      <TabButton isSelected={!isWordTab} onClick={toggleTab}>
        <MessageSquare className={`h-4 w-4 ${useWhiteOnPrimary && !isWordTab ? 'text-white' : ''}`} />
        <span className={useWhiteOnPrimary && !isWordTab ? 'text-white' : undefined}>문장</span>
      </TabButton>
    </div>
  );
};

export default TabList;
