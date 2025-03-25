import AuthForm from '@/components/AuthForm';
import Logout from '@/components/Logout';
import { createClient } from '@/utils/supabase/server';

export default async function LoginPage() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

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
