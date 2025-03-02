const env =
  getEnvVar("NEXT_PUBLIC_ENVIRONMENT", false) ||
  getEnvVar("NEXT_PUBLIC_VERCEL_ENV", false) ||
  getEnvVar("VERCEL_ENV", false);
export const ENVIRONMENT =
  env === "production"
    ? "production"
    : env === "preview"
    ? "preview"
    : "development";

// Supabase
export const SUPABASE_ANON_KEY = getEnvVar("SUPABASE_ANON_KEY");
export const SUPABASE_SERVICE_ROLE_KEY = getEnvVar("SUPABASE_SERVICE_ROLE_KEY");
export const SUPABASE_URL = getEnvVar("SUPABASE_URL");

export function getEnvVar(variable: string, required?: true): string;
export function getEnvVar(
  variable: string,
  required: boolean
): string | undefined;
export function getEnvVar(variable: string, required = true) {
  const value = process.env[variable];
  if (!value && required) {
    throw new Error(
      `The required environment variable "${variable}" is missing.`
    );
  }
  return value;
}

if (typeof window !== "undefined") {
  console.error(
    "DANGER: You're accessing the server config on the client. This may expose your secrets"
  );
}
