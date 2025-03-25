import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log(request);
    const origin = process.env.NEXT_PUBLIC_SITE_URL;
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) throw new Error('Authorization code missing');

    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

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
