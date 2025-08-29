import { CreateWordSchema } from '@/backend/clients/word/vocabulary.schemas';
import { addWord } from '@/backend/services/vocabulary.service';
import { getAuthUser } from '@/backend/utils/auth';
import { getErrorMessage, getHttpStatus } from '@/backend/utils/error/error';
import { lemmatizeHeadword } from '@/libs/lemmatize/lemmatize';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const auth = await getAuthUser(req);
  if (!auth || !auth.isValid) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  if (auth.isMockUser) {
    return NextResponse.json({ message: 'Mock user cannot save words' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const parsed = CreateWordSchema.parse(body);

    const lemma = parsed.lemma && parsed.lemma.trim() ? parsed.lemma.trim() : lemmatizeHeadword(parsed.headword);

    const result = await addWord(auth.id, { ...parsed, lemma });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const status = getHttpStatus(error) ?? 500;
    const message = getErrorMessage(error);

    return NextResponse.json({ message }, { status });
  }
}
