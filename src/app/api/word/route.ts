import { getWordBundleRandom } from '@/backend/services/word.service';
import { getErrorMessage, getHttpStatus } from '@/backend/utils/error/error';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const bundle = await getWordBundleRandom();
    return NextResponse.json(bundle);
  } catch (error) {
    const status = getHttpStatus(error) ?? 500;
    const message = getErrorMessage(error);

    return NextResponse.json({ message }, { status });
  }
}
