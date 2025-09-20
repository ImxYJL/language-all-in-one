import { BottomSheet } from '../common';
import WordCreateForm from './WordCreateForm';

interface WordBottomSheetProps {
  isOpen: boolean;
}

const WordBottomSheet = ({ isOpen }: WordBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen}>
      <WordCreateForm />
    </BottomSheet>
  );
};

export default WordBottomSheet;
