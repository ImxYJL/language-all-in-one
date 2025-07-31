import clsx from 'clsx';

export type ButtonStyleType = 'primary' | 'secondary' | 'custom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: 'primary' | 'secondary' | 'custom';
  className?: string;
}

const Button = ({ type, styleType = 'primary', disabled, className, ...props }: ButtonProps) => {
  const base = 'rounded font-medium transition';
  const disabledStyle =
    'bg-[color:var(--theme-disabled-bg)] text-[color:var(--theme-disabled-text)] opacity-50 cursor-not-allowed pointer-events-none';

  const variants = {
    primary: 'bg-primary text-white hover:bg-[color:var(--color-primary-hover1)]',
    secondary: 'bg-secondary text-white hover:bg-[color:var(--color-secondary-hover1)]',
    custom: '',
  };

  const appliedStyle = disabled ? disabledStyle : variants[styleType];

  return <button type={type} disabled={disabled} className={clsx(base, appliedStyle, className)} {...props} />;
};

export default Button;
