import { BottomSheet } from '../common';
import SentenceCreateForm from './SentenceCreateForm';

interface SentenceBottomSheetProps {
  isOpen: boolean;
}

const SentenceBottomSheet = ({ isOpen }: SentenceBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen}>
      <SentenceCreateForm />
    </BottomSheet>
  );
};

export default SentenceBottomSheet;
