import { getWordBundleRandom } from '@/backend/services/word.service';
import { getAuthUser } from '@/backend/utils/auth';
import { getErrorMessage, getHttpStatus } from '@/backend/utils/error/error';
import { MOCKED_RANDOM_WORD } from '@/libs/msw/mock/words';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const auth = await getAuthUser(req);
  if (!auth || !auth.isValid) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if (auth.isMockUser) {
    return NextResponse.json(MOCKED_RANDOM_WORD, { status: 200 });
  }

  try {
    const bundle = await getWordBundleRandom();
    return NextResponse.json(bundle);
  } catch (error) {
    const status = getHttpStatus(error) ?? 500;
    const message = getErrorMessage(error);

    return NextResponse.json({ message }, { status });
  }
}
