import "server-only";
import { headers } from "next/headers";
import { redirect, forbidden } from "next/navigation";
import { auth } from "@/lib/auth";

export const ROLES = ["client", "editor", "admin"] as const;
export type UserRole = (typeof ROLES)[number];

export async function requireSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth?mode=login");
  return session;
}

export async function requireRole(...allowed: UserRole[]) {
  const session = await requireSession();
  const role = session.user.role as UserRole;
  if (!allowed.includes(role)) forbidden();
  return session;
}
