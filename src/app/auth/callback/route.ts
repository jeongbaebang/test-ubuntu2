import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const headersList = await headers();
  const origin = headersList.get('origin') || process.env.NEXT_PUBLIC_SITE_URL;

  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    console.log('export async function GET(request: NextRequest) {');
    console.log('request', request.url);
    console.log('request', origin);
    console.log('end--');

    if (!code) throw new Error('Authorization code missing');

    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    console.log(error);

    return error
      ? NextResponse.redirect(`${origin}/error?code=auth_fail`)
      : NextResponse.redirect(new URL(searchParams.get('next') || '/', origin));
  } catch (error) {
    console.error('Auth callback error:', error);
    return NextResponse.redirect(
      new URL(`/error?code=internal_error`, process.env.NEXT_PUBLIC_SITE_URL)
    );
  }
}
