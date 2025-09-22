import styles from './styles/StarLoader.module.css';
import clsx from 'clsx';

const StarIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 256 256" width="32" height="32" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      fill="var(--color-primary)"
      d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"
    ></path>
  </svg>
);

const StarLoader = () => {
  return (
    <div className="flex items-center justify-center select-none">
      <StarIcon className={styles.star} />
      <StarIcon className={clsx(styles.star, styles.star2, '-ml-2.5 h-5')} />
      <StarIcon className={clsx(styles.star, styles.star3, '-ml-[15px] h-4')} />
    </div>
  );
};

export default StarLoader;
