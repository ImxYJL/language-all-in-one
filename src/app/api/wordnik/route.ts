import { NextRequest, NextResponse } from 'next/server';
import { getWordBundleRandom } from '@/backend/services/word.service';
import { MOCKED_RANDOM_WORD } from '@/libs/msw/mock/words';
import { requireAuth } from '@/backend/utils/auth/guards';
import { handleRouteError } from '@/backend/error';

export async function GET(req: NextRequest) {
  try {
    let authResult = null;
    try {
      authResult = await requireAuth(req, { requireRealUser: true });
    } catch {
      // NOTE: redirect 직후 race 가능성 → 잠시 대기 후 1회 재시도
      await new Promise((r) => setTimeout(r, 300));
      authResult = await requireAuth(req, { requireRealUser: true });
    }

    const { authedUserInfo: userInfo } = authResult;
    if (userInfo.isMockUser) return NextResponse.json(MOCKED_RANDOM_WORD);

    const bundle = await getWordBundleRandom();
    return NextResponse.json(bundle);
  } catch (e) {
    return handleRouteError(e);
  }
}
