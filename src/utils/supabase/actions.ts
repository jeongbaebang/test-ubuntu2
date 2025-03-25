'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { createClient } from './server';

export async function signInWithGoogle() {
  const supabase = await createClient();
  const headersList = await headers();
  const origin = headersList.get('origin') || process.env.NEXT_PUBLIC_SITE_URL;

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
