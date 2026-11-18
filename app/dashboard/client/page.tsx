import { requireRole } from "@/lib/authz";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import Link from "next/link";
export default async function ClientDashboard() {
  const { user } = await requireRole("client");
  return <DashboardShell role="client" title={`Bonjour, ${user.name}.`} description="Vos lectures, abonnements et commandes seront regroupés dans votre espace personnel.">
    <div className="q-dashboard__cards">
      <article><span>01 / Bibliothèque</span><h2>Mes magazines & livres</h2><p>Les publications acquises apparaîtront ici dès l’activation du catalogue et des commandes.</p><Link href="/#magazines">Découvrir les magazines →</Link></article>
      <article><span>02 / Abonnements</span><h2>Mes abonnements</h2><p>Aucun abonnement actif enregistré. Les abonnements réels seront liés à votre compte après paiement confirmé.</p></article>
      <article><span>03 / Commandes</span><h2>Historique</h2><p>Aucune commande enregistrée. Le panier actuel reste une démonstration locale.</p><Link href="/panier">Voir mon panier →</Link></article>
    </div>
  </DashboardShell>;
}
