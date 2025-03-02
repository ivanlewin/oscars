import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function SignOut() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/");
  }

  await supabase.auth.signOut();
  return redirect("/");
}
