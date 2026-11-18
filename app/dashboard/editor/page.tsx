import { requireRole } from "@/lib/authz";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { PublicationForm } from "@/components/dashboard/publication-form";

export default async function EditorDashboard() {
  const session = await requireRole("editor", "admin");
  const publications = await prisma.publication.findMany({ where: { authorId: session.user.id }, orderBy: { createdAt: "desc" }, take: 40 });
  return <DashboardShell role="editor" title="L’atelier éditorial." description="Préparez les livres et magazines de votre catalogue. Les nouveaux contenus restent privés tant qu’ils ne sont pas publiés.">
    <PublicationForm />
    <section className="q-dashboard__listing"><h2>Mes publications</h2>
      {publications.length === 0 ? <p>Aucun brouillon pour le moment.</p> : <ul>{publications.map(p => <li key={p.id}><strong>{p.title}</strong><span>{p.kind === "BOOK" ? "Livre" : "Magazine"} · {p.status === "DRAFT" ? "Brouillon" : p.status === "PUBLISHED" ? "Publié" : "Archivé"}</span></li>)}</ul>}
    </section>
  </DashboardShell>;
}
