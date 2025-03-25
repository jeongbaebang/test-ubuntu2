import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function PrivatePage() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase.auth.getUser(session?.access_token);
  if (error || !data?.user) {
    redirect('/login');
  }

  return <p>안녕하세요, {data.user.email}님!</p>;
}
