'use client';

import { useGetUserInfo } from '@/frontend/queries/users/useGetUserInfo';

export default function UserInfo() {
  const { data, isLoading, error } = useGetUserInfo();

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러가 발생했어요.</p>;

  if (!data) return null;

  return (
    <div>
      <p>유저 ID: {data.id}</p>
      <p>유저 이름: {data.name}</p>
    </div>
  );
}
