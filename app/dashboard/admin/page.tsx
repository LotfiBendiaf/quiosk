import { requireRole } from "@/lib/authz";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import Link from "next/link";

export default async function AdminDashboard() {
  await requireRole("admin");
  const [users, publications] = await Promise.all([
    prisma.user.count(),
    prisma.publication.count(),
  ]);
  return <DashboardShell role="admin" title="Vue d’ensemble." description="Une base sécurisée pour piloter les utilisateurs et le catalogue de Quiosk.">
    <div className="q-dashboard__cards">
      <article><span>Utilisateurs</span><h2>{users}</h2><p>Comptes enregistrés dans Better Auth.</p></article>
      <article><span>Publications</span><h2>{publications}</h2><p>Livres et magazines dans le catalogue de gestion.</p><Link href="/dashboard/editor">Accéder à l’atelier éditorial →</Link></article>
      <article><span>Commandes & abonnements</span><h2>À connecter</h2><p>La gestion financière sera ajoutée après la mise en place des commandes serveur.</p></article>
    </div>
  </DashboardShell>;
}
