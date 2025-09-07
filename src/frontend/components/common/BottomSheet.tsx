'use client';

import React from 'react';
import clsx from 'clsx';
import { usePortal } from '@/frontend/hooks';

interface BottomSheetProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, className, children }) => {
  const { Portal } = usePortal('sheet');

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-[1000] bg-black/40" onClick={onClose} />
      <div
        className={clsx(
          'fixed inset-x-0 bottom-0 z-[1001] rounded-t-2xl bg-white p-4 shadow-xl',
          'animate-[slideUp_160ms_ease-out]',
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(12px); opacity: .9; }
          to   { transform: translateY(0);     opacity: 1; }
        }
      `}</style>
    </Portal>
  );
};

export default BottomSheet;
