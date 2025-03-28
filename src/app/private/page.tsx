import { logout } from '@/utils/supabase/actions';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function PrivatePage() {
  const supabase = await createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error('세션 가져오기 오류:', error);
    await logout();
  }

  if (error || !session?.user) {
    redirect('/login');
  }

  return <p>안녕하세요, {session.user.email}님!</p>;
}
