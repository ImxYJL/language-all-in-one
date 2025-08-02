import clsx from 'clsx';
import React from 'react';

export type InputStyleType = 'primary' | 'custom';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  styleType?: InputStyleType;
  className?: string;
}

const Input = ({ styleType = 'primary', className, ...props }: InputProps) => {
  const base = 'w-full rounded-xl px-4 py-3 text-sm transition placeholder-gray-400';

  const variants = {
    primary: 'border border-gray-300 focus:border-primary hover:border-primary focus:outline-none',
    custom: '',
  };

  return <input className={clsx(base, variants[styleType], className)} {...props} />;
};

export default Input;
