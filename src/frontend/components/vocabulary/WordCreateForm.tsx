'use client';

import { CreateWordSchema } from '@/backend/clients/word/vocabulary.schemas';
import { CreateWordInput, CreateWordParsed } from '@/types/vocabulary';
import { useState } from 'react';
import { Button, InputField, Switch } from '../common';
import { useZodForm } from '@/frontend/hooks';
import { useCreateWord } from '@/frontend/queries/vocabulary/useCreateWord';
import { BottomSheetFormProps } from './VocaContent';

// 근데 완전히 데이터 타입을 제네릭 지원할 게 아니라면 그냥 favorite마냥 setState 직접 넘겨줘도 될 듯
// (그냥 완전히 onChange는 알아서 걸어주도록)
const WordCreateForm = ({ closeSheet }: BottomSheetFormProps) => {
  const { values, setValue, registerText, isValid } = useZodForm(CreateWordSchema, {
    headword: '',
    meaningKo: '',
    favorited: false,
    examples: null,
  });
  const { mutate, isPending } = useCreateWord({ onSuccess: closeSheet });

  // TODO: 추후 다중 문장 입력 받거나, DB 타입을 단일 text로 수정
  const [example, setExample] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;

    // 예문을 배열 형태로 보내야 하므로 변환
    const payload: CreateWordInput = {
      ...values,
      examples: example.trim() ? [{ text: example.trim() }] : null,
    };

    const parsed = CreateWordSchema.safeParse(payload);
    if (!parsed.success) return;

    const data: CreateWordParsed = parsed.data;
    mutate(data);
  };

  // TODO: InputField에서 그냥 Input 컴포넌트 자체를 children으로 받도록 만들기
  return (
    <form className="w-full space-y-4 p-4" onSubmit={onSubmit}>
      <InputField label="단어" placeholder="예: 구현하다" required {...registerText('headword')} />

      <InputField label="뜻" placeholder="예: 실행하다, 구현하다" {...registerText('meaningKo')} />

      <InputField
        label="예문"
        placeholder="예: We need to implement this feature."
        name="example"
        value={example}
        onChange={(e) => setExample(e.target.value)}
      />

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
        <Button type="submit" styleType="primary" className="h-12 w-full" disabled={!isValid || isPending}>
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <p>추가하는 중...</p>
            </div>
          ) : (
            '추가하기'
          )}
        </Button>
      </div>
    </form>
  );
};

export default WordCreateForm;
