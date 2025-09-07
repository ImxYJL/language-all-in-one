import clsx from 'clsx';
import React from 'react';

export type TextareaStyleType = 'primary' | 'custom';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  styleType?: TextareaStyleType;
  className?: string;
}

const Textarea = ({ styleType = 'primary', className, rows = 3, ...props }: TextareaProps) => {
  const base = 'w-full rounded-xl px-4 py-3 text-sm transition placeholder-gray-400 resize-none';

  const variants = {
    primary: 'border border-gray-300 focus:border-primary hover:border-primary focus:outline-none',
    custom: '',
  };

  return <textarea className={clsx(base, variants[styleType], className)} rows={rows} {...props} />;
};

export default Textarea;
