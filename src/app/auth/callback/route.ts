import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const headersList = await headers();
  const requestUrl = new URL(request.url);
  const origin =
    headersList.get('origin') || (process.env.NEXT_PUBLIC_SITE_URL as string);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/';

  console.log('export async function GET(request: NextRequest) {');
  console.log('request', request.url);
  console.log('request', origin);
  console.log('end--');

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    const { data: user } = await supabase.auth.getUser();

    console.log('code');
    console.log(supabase);
    console.log(error);

    if (!error && user) {
      return redirect(origin);
    }
  }

  // 오류 페이지로 리디렉션
  return NextResponse.redirect(new URL('/error', origin));
}
