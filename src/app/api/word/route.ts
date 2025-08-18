import { getWordBundleRandom } from '@/backend/services/word.service';
import { isUpstreamError } from '@/backend/utils/error/upstreamError';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const bundle = await getWordBundleRandom();
    return NextResponse.json(bundle);
  } catch (e) {
    const status = isUpstreamError(e) ? e.status : 502;
    const message = e instanceof Error ? e.message : typeof e === 'string' ? e : 'Unknown error';
    return NextResponse.json({ message }, { status });
  }
}
