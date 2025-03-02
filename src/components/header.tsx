import { createClient } from "@/utils/supabase/server";
import { UserIcon } from "lucide-react";

export async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log({ user });
  return (
    <header className="flex justify-between items-center">
      <div className="flex items-center gap-2 ml-auto">
        {user ? (
          <>
            <p>{user.email}</p>
            <a href="/sign-out">Sign out</a>
          </>
        ) : (
          <>
            <UserIcon className="h-4 w-4" />
            <a href="/sign-in">Sign in</a>
          </>
        )}
      </div>
    </header>
  );
}
