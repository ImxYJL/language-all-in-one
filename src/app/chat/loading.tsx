import { StarLoader } from '@/frontend/components/common';

export default function Loading() {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center">
      <StarLoader />
    </div>
  );
}
