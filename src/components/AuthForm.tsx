import { signInWithGoogle } from '@/utils/supabase/actions';

const AuthForm = () => {
  return (
    <div>
      <form>
        <button
          formAction={signInWithGoogle}
          className="border rounded px-2.5 py-2"
        >
          Google로 로그인
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
