import AuthForm from '@/components/AuthForm';
import Logout from '@/components/Logout';
import { logout } from '@/utils/supabase/actions';
import { createClient } from '@/utils/supabase/server';

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error('세션 가져오기 오류:', error);
    await logout();
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {session ? (
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
