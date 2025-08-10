import clsx from 'clsx';
import { ElementType } from 'react';

interface NavigationItemProps {
  icon: ElementType;
  label: string;
  href: string;
  className?: string;
}

const NavigationItem = ({ icon: Icon, label, href, className }: NavigationItemProps) => {
  return (
    <li>
      <a
        href={href}
        className={clsx(
          'flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100/50 hover:text-gray-900',
          className,
        )}
      >
        <Icon className="h-4 w-4" />
        {label}
      </a>
    </li>
  );
};

export default NavigationItem;
