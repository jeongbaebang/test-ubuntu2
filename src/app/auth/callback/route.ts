import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);

  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      redirect('/error');
    }

    revalidatePath('/', 'layout');
    redirect('/');
  }

  // URL to redirect to after sign up process completes
  return redirect('/error');
}
