'use client';

import { useState } from 'react';
import { useLogin } from '@/frontend/queries/auth/useLogin';
import { Button, Input } from '@/frontend/components/common';
import { LOGIN } from '@/constants/auth';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { mutate, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      alert('모든 정보를 입력해주세요.');
      return;
    }

    mutate(
      { username: trimmedUsername, password: trimmedPassword },
      {
        onSuccess: () => {
          window.location.href = '/dashboard';
        },
      },
    );
  };

  return (
    <div className="w-full max-w-md">
      <div className="relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">로그인</h2>
        <p className="mb-8 text-gray-600">계정에 로그인하여 AI 어시스턴트와 대화를 시작하세요.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              사용자 이름
            </label>
            <div className="relative">
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="focus:border-primary hover:border-primary w-full rounded-xl border border-gray-300 px-4 py-3 text-base placeholder-gray-400 transition"
                placeholder="Hello를 입력해주세요"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
            </div>

            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus:border-primary hover:border-primary w-full rounded-xl border border-gray-300 px-4 py-3 text-base placeholder-gray-400 transition"
              placeholder={`${LOGIN.password.min}자 이상, ${LOGIN.password.max}자 이하여야 합니다.`}
              required
            />
          </div>

          <Button type="submit" disabled={isPending} className="w-full rounded-xl py-4 text-lg font-semibold">
            {isPending ? '로딩 중' : '로그인'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
