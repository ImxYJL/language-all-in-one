import 'server-only';

import { MOCKED_USER } from '@/libs/msw/mock/users';
import { serverEnv } from '@/validators/env';

export function isDev() {
  return serverEnv.NODE_ENV === 'development';
}

export function isUsingMock() {
  return process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';
}

export function getRealUserId() {
  return serverEnv.REAL_USER_ID ?? '';
}

export function isMockUser(username?: string, id?: string) {
  if (username) return username === MOCKED_USER.username;
  if (id) return id === MOCKED_USER.id;
  return null;
}
