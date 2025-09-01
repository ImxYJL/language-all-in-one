import { NextRequest, NextResponse } from 'next/server';
import { getWordBundleRandom } from '@/backend/services/word.service';
import { MOCKED_RANDOM_WORD } from '@/libs/msw/mock/words';
import { requireAuth } from '@/backend/utils/auth/guards';
import { handleRouteError } from '@/backend/error';

export async function GET(req: NextRequest) {
  const { authedUserInfo: userInfo } = await requireAuth(req, { requireRealUser: true });

  if (userInfo.isMockUser) return NextResponse.json(MOCKED_RANDOM_WORD);

  try {
    const bundle = await getWordBundleRandom();
    return NextResponse.json(bundle);
  } catch (e) {
    return handleRouteError(e);
  }
}
