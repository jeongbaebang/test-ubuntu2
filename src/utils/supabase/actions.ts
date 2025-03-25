'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { createClient } from './server';

export async function signInWithGoogle() {
  const supabase = await createClient();
  const headersList = await headers();
  const origin = headersList.get('origin') || process.env.NEXT_PUBLIC_SITE_URL;

  console.log('signInWithGoogle');
  console.log('origin', headersList.get('origin') || '없음');
  console.log('x-forwarded-host:', headersList.get('x-forwarded-host'));
  console.log('x-forwarded-proto:', headersList.get('x-forwarded-proto'));
  console.log('signInWithGoogle --end');

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error('Error signing in with Google:', error);
    return redirect('/error');
  }

  return redirect(data.url);
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
  }
}
