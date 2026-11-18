import Link from "next/link";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/quiosk";
import { SiteFooter } from "@/components/layout/site-footer";
import { SignOutButton } from "@/components/dashboard/sign-out-button";

export function DashboardShell({ role, title, description, children }: { role: "client" | "editor" | "admin"; title: string; description: string; children: ReactNode }) {
  return <><SiteHeader /><main className="q-dashboard"><div className="q-dashboard__wrap">
    <div className="q-dashboard__nav"><Link href="/" className="q-dashboard__back">← Revenir au kiosque</Link><SignOutButton /></div>
    <p className="q-dashboard__eyebrow">Quiosk / Espace {role === "client" ? "lecteur" : role === "editor" ? "éditeur" : "administrateur"}</p>
    <h1>{title}</h1><p className="q-dashboard__lead">{description}</p>
    {children}
  </div></main><SiteFooter /></>;
}
