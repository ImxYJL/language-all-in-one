import { ChangeEvent, useId } from 'react';

interface ToggleProps {
  id?: string;
  isChecked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Toggle = ({ id, isChecked, onChange }: ToggleProps) => {
  const defaultId = useId();

  return (
    <label htmlFor={id ?? defaultId} className="inline-flex cursor-pointer items-center gap-2 select-none">
      <input id={id ?? defaultId} type="checkbox" checked={isChecked} onChange={onChange} className="peer sr-only" />

      <span
        className="relative inline-block h-8 w-14 rounded-full bg-gray-300 transition-all duration-300 ease-in-out peer-checked:bg-[var(--theme-primary)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--theme-secondary)] peer-focus-visible:ring-offset-2 peer-focus-visible:outline-none hover:bg-[var(--theme-secondary-hover1)] peer-checked:hover:bg-[var(--theme-primary-hover1)] motion-reduce:transition-none peer-checked:[&_.knob]:translate-x-6 peer-checked:[&_.knob]:shadow-[-10px_0_40px_rgba(0,0,0,0.10)] peer-active:[&_.knob]:w-12 peer-checked:peer-active:[&_.knob]:translate-x-2"
        aria-hidden="true"
      >
        <span className="knob absolute top-1 left-1 h-6 w-6 transform rounded-full bg-white shadow-[10px_0_40px_rgba(0,0,0,0.10)] transition-all duration-300 ease-in-out motion-reduce:transition-none" />
      </span>
    </label>
  );
};

export default Toggle;
