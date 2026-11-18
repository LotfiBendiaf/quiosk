import { requireRole } from "@/lib/authz";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import Link from "next/link";

export default async function AdminDashboard() {
  await requireRole("admin");
  const [users, publications, recentUsers, recentPublications] = await Promise.all([
    prisma.user.count(),
    prisma.publication.count(),
    prisma.user.findMany({ select: { id: true, name: true, email: true, role: true }, take: 20, orderBy: { createdAt: "desc" } }),
    prisma.publication.findMany({ select: { id: true, title: true, kind: true, status: true }, take: 20, orderBy: { createdAt: "desc" } }),
  ]);
  return <DashboardShell role="admin" title="Vue d’ensemble." description="Une base sécurisée pour piloter les utilisateurs et le catalogue de Quiosk.">
    <div className="q-dashboard__cards">
      <article><span>Utilisateurs</span><h2>{users}</h2><p>Comptes enregistrés dans Better Auth.</p></article>
      <article><span>Publications</span><h2>{publications}</h2><p>Livres et magazines dans le catalogue de gestion.</p><Link href="/dashboard/editor">Accéder à l’atelier éditorial →</Link></article>
      <article><span>Commandes & abonnements</span><h2>À connecter</h2><p>La gestion financière sera ajoutée après la mise en place des commandes serveur.</p></article>
    </div>
    <section className="q-dashboard__listing"><h2>Comptes récents</h2><ul>{recentUsers.map(user => <li key={user.id}><strong>{user.name} · {user.email}</strong><span>{user.role}</span></li>)}</ul></section>
    <section className="q-dashboard__listing"><h2>Publications récentes</h2><ul>{recentPublications.map(p => <li key={p.id}><strong>{p.title}</strong><span>{p.kind === "BOOK" ? "Livre" : "Magazine"} · {p.status}</span></li>)}</ul></section>
  </DashboardShell>;
}
