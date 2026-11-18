import "server-only";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const ROLES = ["client", "editor", "admin"] as const;
export type UserRole = (typeof ROLES)[number];

export async function requireSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth?mode=login");
  return session;
}

export async function requireRole(...allowed: UserRole[]) {
  const session = await requireSession();
  const account = await prisma.user.findUnique({ where: { id: session.user.id }, select: { role: true } });
  const role = account?.role as UserRole | undefined;
  if (!role || !allowed.includes(role)) notFound();
  return session;
}
