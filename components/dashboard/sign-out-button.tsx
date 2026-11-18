"use client";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  return <button type="button" className="q-dashboard__signout" onClick={async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }}>Se déconnecter</button>;
}
