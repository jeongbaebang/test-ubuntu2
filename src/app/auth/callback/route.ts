import { createClient } from '@/utils/supabase/server';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const headersList = await headers();
  const requestUrl = new URL(request.url);
  const cookieStore = await cookies();
  const redirectPath = cookieStore.get('next')?.value || '/';
  const code = requestUrl.searchParams.get('code');
  const origin =
    headersList.get('origin') ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    request.url;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const response = NextResponse.redirect(new URL(redirectPath, origin));
      response.cookies.delete('next');

      return response;
    }
  }

  // URL to redirect to after sign up process completes
  return redirect('/error');
}
