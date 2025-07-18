import { NextResponse } from 'next/server';
import { getUser } from '@/libs/data/users';

export async function GET() {
  try {
    const user = await getUser();
    return NextResponse.json(user);
  } catch (error) {
    // In the future, you can handle specific errors from your data layer
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
