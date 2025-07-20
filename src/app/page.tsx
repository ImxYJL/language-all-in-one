'use client';

import { Button } from '@/frontend/components/common';
import { useLogin } from '@/frontend/queries/auth/useLogin';
import { useState } from 'react';

export default function Home() {
  const [id, setId] = useState('');
  const { mutate, isPending, error } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(id, {
      onSuccess: () => {
        window.location.href = '/dashboard';
      },
    });
  };

  return (
    <main className="bg-primary flex min-h-screen items-center justify-center px-4 text-white">
      <div className="w-full max-w-md space-y-6 text-center">
        <h1 className="text-3xl font-bold">Welcome!</h1>
        <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="접속을 위해 아이디를 입력해주세요"
            className="w-full flex-1 rounded-md border border-white/40 bg-white/25 px-4 py-2 text-sm text-white placeholder-white/70 transition focus:border-transparent focus:ring-2 focus:ring-white focus:outline-none sm:w-64"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Button type="submit" styleType="primary" className="w-full sm:w-auto" disabled={isPending}>
            {isPending ? '로그인 중...' : '확인'}
          </Button>
        </form>
        {error && <p className="text-red-500">{(error as any).response.data}</p>}
      </div>
    </main>
  );
}
