import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { EditorialContainer } from "@/components/editorial/primitives";

const discover = [
  { label: "À la une", href: "/#magazines" },
  { label: "Nos univers", href: "/#categories" },
  { label: "Regards d’Algérie", href: "/#algerie" },
  { label: "Les abonnements", href: "/#abonnements" },
];
const about = [
  { label: "Notre histoire", href: "/a-propos" },
  { label: "L’expérience Quiosk", href: "/#experience" },
  { label: "Le journal", href: "/#journal" },
  { label: "La lettre Quiosk", href: "/#newsletter" },
];
const account = [
  { label: "Mon espace", href: "/auth?mode=login" },
  { label: "Créer un compte", href: "/auth?mode=signup" },
  { label: "Mon panier", href: "/panier" },
];

function FooterLinks({ title, links }: { title: string; links: ReadonlyArray<{ label: string; href: string }> }) {
  return (
    <div className="q-footer__links">
      <h3>{title}</h3>
      <ul>
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href}>{label}<ArrowUpRight aria-hidden="true" size={14} /></Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="q-footer" aria-label="Pied de page Quiosk">
      <EditorialContainer>
        <div className="q-footer__lead">
          <div className="q-footer__lead-copy">
            <p className="q-footer__eyebrow"><span className="q-footer__spark" aria-hidden="true">✳</span> Le monde se feuillette</p>
            <h2>Il reste tant <em>à découvrir.</em></h2>
            <p className="q-footer__lead-description">Des regards singuliers, des histoires à garder et la liberté d’explorer à votre rythme.</p>
          </div>
          <Link href="/#magazines" className="q-footer__discover" aria-label="Découvrir nos magazines">
            <span>Explorer<br />les magazines</span>
            <ArrowUpRight aria-hidden="true" size={24} />
          </Link>
        </div>

        <div className="q-footer__directory">
          <div className="q-footer__identity">
            <Link className="q-footer__small-logo" href="/" aria-label="Quiosk, accueil">
              <Image src="/quiosk-logo1.svg" alt="Quiosk" width={3508} height={1282} />
            </Link>
            <p>Le kiosque des regards<br />qui comptent.</p>
            <span className="q-footer__location">Imaginé en Algérie. Ouvert sur le monde.</span>
          </div>
          <nav aria-label="Navigation du pied de page" className="q-footer__nav">
            <FooterLinks title="Explorer" links={discover} />
            <FooterLinks title="Quiosk" links={about} />
            <FooterLinks title="Votre espace" links={account} />
          </nav>
        </div>

        <div className="q-footer__big-brand" aria-hidden="true">quiosk<span>.</span></div>

        <div className="q-footer__bottom">
          <span>© {new Date().getFullYear()} Quiosk. Tous droits réservés.</span>
          <span>Culture <span className="q-footer__dot">·</span> Lecture <span className="q-footer__dot">·</span> Curiosité</span>
          <Link href="/#decouvrir" className="q-footer__back-to-top">Retour en haut <ArrowUp size={14} aria-hidden="true" /></Link>
        </div>
        <p className="q-footer__notice">Site en développement. Les magazines et tarifs de démonstration ne constituent pas des offres commerciales.</p>
      </EditorialContainer>
    </footer>
  );
}
