import AuthForm from '@/components/AuthForm';
import Logout from '@/components/Logout';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function LoginPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  if (error) {
    for (const cookie of allCookies) {
      if (
        cookie.name.startsWith('sb-') ||
        cookie.name.includes('supabase') ||
        cookie.name.includes('auth')
      ) {
        cookieStore.delete(cookie.name);
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {data.user ? (
        <>
          <h1 className="text-2xl font-bold mb-6">로그아웃</h1>
          <Logout />
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-6">로그인</h1>
          <AuthForm />
        </>
      )}
    </div>
  );
}
