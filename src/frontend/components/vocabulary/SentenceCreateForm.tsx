'use client';

import { CreateSentenceSchema } from '@/backend/clients/word/vocabulary.schemas';
import { CreateSentenceInput, CreateSentenceParsed } from '@/types/vocabulary';
import { Button, InputField, Switch } from '../common';
import { useZodForm } from '@/frontend/hooks';
import { BottomSheetFormProps } from './VocaContent';
import { useCreateSentence } from '@/frontend/queries/vocabulary/useCreateSentence';

const SentenceCreateForm = ({ closeSheet }: BottomSheetFormProps) => {
  const { values, setValue, registerText, isValid } = useZodForm(CreateSentenceSchema, {
    text: '',
    translation: '',
    favorited: false,
  });
  const { mutate } = useCreateSentence({ onSuccess: closeSheet });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: CreateSentenceInput = {
      ...values,
    };

    const parsed = CreateSentenceSchema.safeParse(payload);
    if (!parsed.success) return;

    const data: CreateSentenceParsed = parsed.data;
    mutate(data);
  };

  return (
    <form className="w-full space-y-4 p-4" onSubmit={onSubmit}>
      <InputField label="문장" placeholder="예: 구현하다" required {...registerText('text')} />

      <InputField label="해석" placeholder="예: 실행하다, 구현하다" {...registerText('translation')} />

      <div className="flex items-center gap-2">
        <label htmlFor="favorited" className="block text-base text-gray-700">
          즐겨찾기
        </label>
        <Switch
          id="favorited"
          isChecked={!!values.favorited}
          onChange={(e) => setValue('favorited', e.target.checked)}
        />
      </div>

      <div className="pt-1">
        <Button type="submit" styleType="primary" className="h-12 w-full" disabled={!isValid}>
          추가하기
        </Button>
      </div>
    </form>
  );
};

export default SentenceCreateForm;
