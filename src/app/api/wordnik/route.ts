import { NextRequest, NextResponse } from 'next/server';
import { getWordBundleRandom } from '@/backend/services/word.service';
import { MOCKED_RANDOM_WORD } from '@/libs/msw/mock/words';
import { getErrorMessage, getHttpStatus } from '@/backend/utils/error/error';
import { requireAuth } from '@/backend/utils/auth/guards';

export async function GET(req: NextRequest) {
  const result = await requireAuth(req);
  if (!result.ok) return result.response;

  const { user } = result;
  if (user.isMockUser) return NextResponse.json(MOCKED_RANDOM_WORD);

  try {
    const bundle = await getWordBundleRandom();
    return NextResponse.json(bundle);
  } catch (e) {
    return NextResponse.json({ message: getErrorMessage(e) }, { status: getHttpStatus(e) ?? 500 });
  }
}
