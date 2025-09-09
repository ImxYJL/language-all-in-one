import { useState } from 'react';
import { z } from 'zod';

const useZodForm = <Schema extends z.ZodObject>(schema: Schema, initial: z.input<Schema>) => {
  type InputType = z.input<Schema>;
  type Key = Extract<keyof InputType, string>;
  type FieldErrors = Partial<Record<Key, string>>;

  const [values, setValues] = useState<InputType>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});

  const createSingleFieldObject = <K extends Key, V>(key: K, val: V): Record<K, V> => {
    return { [key]: val } as Record<K, V>;
  };

  const pickField = <K extends Key>(key: K) => {
    return schema.pick({ [key]: true } as Record<K, true>);
  };

  const validateField = <K extends Key>(name: K, value: InputType[K]) => {
    const res = pickField(name).safeParse(createSingleFieldObject(name, value));
    setErrors((prev) => ({ ...prev, [name]: res.success ? '' : res.error.issues[0]?.message || 'Invalid Field' }));

    return res.success;
  };

  const setValue = <K extends Key>(name: K, value: InputType[K]) => {
    setValues((v) => ({ ...v, [name]: value }));
    validateField(name, value);
  };

  const isValid = schema.safeParse(values).success;

  const registerText = <K extends Key>(name: K) => {
    return {
      name,
      value: values[name] ?? '', // 문자열 입력을 기준으로 value를 처리함!
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(name, e.target.value as InputType[K]),
      onBlur: () => validateField(name, values[name]),
      errorMessage: errors[name] || '',
    };
  };

  return { values, setValue, errors, isValid, registerText };
};

export default useZodForm;
