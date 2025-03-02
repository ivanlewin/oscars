import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function SignIn(props: {
  searchParams: Promise<Message>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    return redirect("/");
  }

  const searchParams = await props.searchParams;
  return (
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">Continuar</h1>
      <p className="text-sm text-foreground">
        Ingresá tu correo para iniciar sesión/crear tu cuenta.
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Correo</Label>
        <Input
          required
          name="email"
          placeholder="tu@correo.com"
          autoComplete="email"
        />
        <SubmitButton pendingText="Cargando..." formAction={signInAction}>
          Continuar
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
