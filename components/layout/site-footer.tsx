import Link from "next/link";
import { EditorialContainer } from "@/components/editorial/primitives";

export function SiteFooter() {
  return (
    <footer className="q-footer">
      <EditorialContainer>
        <div className="q-footer__top">
          <div>
            <Link className="q-footer__wordmark" href="/">
              QUIOSK
            </Link>
            <p>
              Le kiosque des regards
              <br />
              qui comptent.
            </p>
          </div>
          <nav aria-label="Navigation de pied de page">
            <div>
              <span>Explorer</span>
              <Link href="/#magazines">Magazines</Link>
              <Link href="/#categories">Catégories</Link>
              <Link href="/#algerie">Regards d’Algérie</Link>
            </div>
            <div>
              <span>Quiosk</span>
              <Link href="/a-propos">À propos</Link>
              <Link href="/#experience">L’expérience</Link>
              <Link href="/#journal">Le journal</Link>
              <Link href="/#newsletter">La lettre</Link>
            </div>
            <div>
              <span>Compte</span>
              <span>Bientôt disponible</span>
              <span>Bibliothèque</span>
              <span>Abonnements</span>
            </div>
            <div>
              <span>Réseaux & légal</span>
              <span>Instagram · bientôt</span>
              <span>Confidentialité · bientôt</span>
              <span>Conditions · bientôt</span>
            </div>
          </nav>
        </div>
        <div className="q-footer__bottom">
          <span>© 2026 Quiosk</span>
          <span>Paris · Alger · Le monde</span>
          <span>Une collection de regards.</span>
        </div>
      </EditorialContainer>
    </footer>
  );
}
