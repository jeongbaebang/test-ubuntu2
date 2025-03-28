import { logout } from '@/utils/supabase/actions';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function PrivatePage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data, error } = await supabase.auth.getUser(session?.access_token);

  if (error) {
    console.error('세션 가져오기 오류:', error);
    await logout();
  }

  if (error || !data?.user) {
    redirect('/login');
  }

  return <p>안녕하세요, {data.user.email}님!</p>;
}
