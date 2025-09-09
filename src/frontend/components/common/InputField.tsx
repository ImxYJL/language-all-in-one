import React from 'react';
import Input from './Input';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

const InputField = ({ id, name, label, errorMessage, className, ...rest }: InputFieldProps) => {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-base text-gray-700">
          {label}
        </label>
      )}

      <Input id={id} name={name} className={className} {...rest} />

      {errorMessage && (
        <p id={`${id}-error`} className="pl-1 text-xs text-red-600">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default InputField;
