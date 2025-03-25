import { logout } from '@/utils/supabase/actions';

export default async function Logout() {
  return (
    <div>
      <form>
        <button formAction={logout} className="border rounded px-2.5 py-2">
          로그아웃
        </button>
      </form>
    </div>
  );
}
