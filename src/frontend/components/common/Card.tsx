import React, { ElementType, ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <article className="from-primary/10 to-primary/5 border-primary/20 space-y-4 rounded-2xl border bg-gradient-to-br p-6">
      {children}
    </article>
  );
};

interface CardHeaderProps {
  icon?: ReactNode;
  title: string;
  titleAs?: ElementType;
  className?: string;
}

const CardHeader = ({ icon, title, titleAs: TitleTag = 'h3', className }: CardHeaderProps) => (
  <div className={clsx('flex items-center gap-2', className)}>
    {icon}
    <TitleTag className="font-semibold text-gray-900">{title}</TitleTag>
  </div>
);

Card.Header = CardHeader;

export default Card;
