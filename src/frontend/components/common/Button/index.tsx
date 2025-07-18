import clsx from 'clsx';

export type ButtonStyleType = 'primary' | 'secondary' | 'custom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: 'primary' | 'secondary' | 'custom';
  className?: string;
}

const Button = ({ type, styleType = 'primary', className, ...props }: ButtonProps) => {
  const base = 'rounded px-4 py-2 text-sm font-medium transition';

  const variants = {
    primary: 'bg-primary text-white hover:bg-[color:var(--color-primary-hover1)]',
    secondary: 'bg-secondary text-white hover:bg-[color:var(--color-secondary-hover1)]',
    custom: '',
  };

  return <button type={type ? type : 'button'} className={clsx(base, variants[styleType], className)} {...props} />;
};

export default Button;
