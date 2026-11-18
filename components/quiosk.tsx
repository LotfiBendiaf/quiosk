"use client";
import Link from "next/link";
import Image from "next/image";
import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronLeft, ChevronRight, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { formatPrice, Magazine } from "@/lib/magazines";

export function EditorialContainer({ children, className = "" }: { children: ReactNode; className?: string }) { return <div className={`container ${className}`}>{children}</div>; }
export function EditorialBadge({ children }: { children: ReactNode }) { return <span className="editorial-badge">{children}</span>; }
export function MagazineCover({ magazine, className = "", priority = false }: { magazine: Magazine; className?: string; priority?: boolean; view?: number }) {
  return <div className={`mag-cover ${className}`}><Image src={magazine.image} alt={`Couverture de ${magazine.title}, ${magazine.issue}`} fill priority={priority} sizes="(max-width: 700px) 70vw, 28vw" /></div>; }
export function PrimaryButton({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" | "dark" }) { return <Link className={`button button-${variant}`} href={href}>{children}<ArrowRight size={16} aria-hidden="true" /></Link>; }
export function SectionHeading({ eyebrow, title, italic, action }: { eyebrow: string; title: string; italic?: string; action?: { label: string; href: string } }) { return <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title} {italic && <em>{italic}</em>}</h2></div>{action && <Link className="text-link" href={action.href}>{action.label}<ArrowRight size={16} /></Link>}</div>; }
export function MagazineCard({ magazine, index = 0 }: { magazine: Magazine; index?: number }) { const reduce = useReducedMotion(); return <motion.article className="mag-card" initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={reduce ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: .65, delay: index * .06 }}><Link className="mag-card-cover" href={`/magazines/${magazine.slug}`}><MagazineCover magazine={magazine} /><span className="cover-action">Voir le numéro <ArrowRight size={15} /></span></Link><div className="mag-card-kicker"><span>{magazine.category}</span><span>{formatPrice(magazine.price)}</span></div><h3><Link href={`/magazines/${magazine.slug}`}>{magazine.title}</Link></h3><p>{magazine.issue}</p></motion.article>; }
export function MagazineCarousel({ magazines }: { magazines: Magazine[] }) { const track = useRef<HTMLDivElement>(null); const move = (direction: number) => track.current?.scrollBy({ left: direction * track.current.clientWidth * .76, behavior: "smooth" }); return <><div className="carousel-controls"><button onClick={() => move(-1)} aria-label="Numéros précédents"><ChevronLeft /></button><button onClick={() => move(1)} aria-label="Numéros suivants"><ChevronRight /></button></div><div className="mag-carousel" ref={track}>{magazines.map((magazine, index) => <MagazineCard key={magazine.slug} magazine={magazine} index={index} />)}</div></>; }
const headerLinks = [["Découvrir", "/#decouvrir"], ["Magazines", "/#magazines"], ["Éditeurs", "/#editeurs"], ["À propos", "/a-propos"], ["Abonnements", "/#abonnements"]] as const;
const universes = [
  { name: "Mode", image: "/images/Sunlit Mediterranean Terrace Portrait-1.png", description: "Des silhouettes, des créateurs et des gestes qui dessinent les sensibilités de demain." },
  { name: "Architecture", image: "/images/Mediterranean Terrace Overlooking Algiers-3.png", description: "Des lieux habités, des villes en mouvement et de nouvelles manières de penser l’espace." },
  { name: "Design", image: "/images/Moroccan Silver and Lavender Still Life-4.png", description: "Objets, matières et savoir-faire : le design comme langage du quotidien." },
  { name: "Art & Culture", image: "/images/images6.jpeg", description: "Les artistes, les œuvres et les idées qui transforment notre regard sur le monde." },
  { name: "Voyage", image: "/images/images2.jpeg", description: "Des destinations racontées avec lenteur, curiosité et un goût certain pour l’ailleurs." },
  { name: "Lifestyle", image: "/images/images4.jpeg", description: "Des rituels et inspirations pour vivre mieux, plus consciemment et avec style." },
  { name: "Business", image: "/images/images8.jpeg", description: "Entrepreneurs, mutations et stratégies pour comprendre l’économie qui vient." },
  { name: "Technologie", image: "/images/images5.jpeg", description: "Les innovations et les usages qui redéfinissent notre façon de créer et d’échanger." },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [activeUniverse, setActiveUniverse] = useState<(typeof universes)[number]["name"] | null>(null);
  const [universeNavHidden, setUniverseNavHidden] = useState(false);
  const selectedUniverse = universes.find(({ name }) => name === activeUniverse);

  useEffect(() => {
    const handleScroll = () => {
      const shouldHide = window.scrollY > 16;
      setUniverseNavHidden(shouldHide);
      if (shouldHide) setActiveUniverse(null);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <>
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Quiosk, accueil"><Image src="/quiosk-logo.png" alt="Quiosk — Books & Magazines" width={500} height={100} className="h-10" priority /></Link>
      <div className="site-header__right">
        <nav className={open ? "open" : ""} aria-label="Navigation principale">
          {headerLinks.map(([label, href]) => <Link key={label} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
          <Link className="mobile-universes-link" href="/#categories" onClick={() => setOpen(false)}>Nos univers</Link>
        </nav>
        <div className="header-tools"><button aria-label="Rechercher"><Search /></button><Link className="header-tool-link" href="/auth?mode=login" aria-label="Mon compte"><UserRound /></Link><button aria-label="Panier"><ShoppingBag /></button><button className="nav-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}>{open ? <X /> : <Menu />}</button></div>
      </div>
    </header>
    <nav className={`universe-nav${universeNavHidden ? " is-hidden" : ""}`} aria-label="Nos univers" aria-hidden={universeNavHidden} inert={universeNavHidden ? true : undefined} onMouseLeave={() => setActiveUniverse(null)}>
      <div className={`universe-nav__item${activeUniverse ? " has-menu-open" : ""}`} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setActiveUniverse(null); }}>
        <Link className="universe-nav__label" href="/#categories" onClick={() => setActiveUniverse(null)}>Nos univers</Link>
        <div className="universe-nav__links">
          {universes.map(({ name }) => <button className={activeUniverse === name ? "is-active" : ""} type="button" key={name} aria-expanded={activeUniverse === name} aria-controls="universe-menu" onMouseEnter={() => setActiveUniverse(name)} onFocus={() => setActiveUniverse(name)} onClick={() => setActiveUniverse(current => current === name ? null : name)}>{name}</button>)}
        </div>
        <div className="universe-mega-menu" id="universe-menu">
          <div className="universe-mega-menu__inner">
            <Link href="/#categories" className="universe-mega-menu__feature" onClick={() => setActiveUniverse(null)}>
              {selectedUniverse && <Image src={selectedUniverse.image} alt={`Sélection ${selectedUniverse.name} de Quiosk`} fill sizes="(min-width: 1050px) 46vw, 100vw" />}
              <span>Explorer {selectedUniverse?.name}</span>
            </Link>
            <div className="universe-mega-menu__content">
              <p>Explorer Quiosk</p>
              <h2>{selectedUniverse?.name}</h2>
              <p className="universe-mega-menu__description">{selectedUniverse?.description}</p>
              <Link className="universe-mega-menu__cta" href="/#categories" onClick={() => setActiveUniverse(null)}>Découvrir cet univers <ArrowRight aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </>;
}
export function SiteFooter() { return <footer><EditorialContainer><div className="footer-main"><div><Link href="/" className="footer-brand" aria-label="Quiosk, accueil"><Image src="/quiosk-logo-dark.png" alt="Quiosk — Books & Magazines" width={1901} height={537} /></Link><p>Le kiosque des regards<br />qui comptent.</p></div><div className="footer-nav"><div><span>Explorer</span><Link href="/#une">À la une</Link><Link href="/#univers">Catégories</Link><Link href="/#derniers">Derniers numéros</Link></div><div><span>Quiosk</span><Link href="/#experience">Notre expérience</Link><Link href="/#journal">Le journal</Link><Link href="/#newsletter">Nous contacter</Link></div><div><span>Suivre</span><a href="#">Instagram</a><a href="#">Pinterest</a><a href="#">LinkedIn</a></div></div></div><div className="footer-bottom"><span>© 2026 Quiosk</span><span>Paris · Alger · Le monde</span><div><a href="#">Confidentialité</a><a href="#">Accessibilité</a></div></div></EditorialContainer></footer>; }
export function NewsletterForm() { const [done, setDone] = useState(false); const submit = (event: FormEvent) => { event.preventDefault(); setDone(true); }; return <form className="newsletter-form" onSubmit={submit}>{done ? <p className="form-success"><Check /> Merci, votre prochaine lecture arrive bientôt.</p> : <><label htmlFor="newsletter-email">Votre adresse e-mail</label><div><input id="newsletter-email" type="email" required placeholder="vous@exemple.fr" /><button aria-label="S'inscrire à la newsletter"><ArrowRight /></button></div><small>Deux lettres par mois, sans bruit inutile. Désinscription en un clic.</small></>}</form>; }
export function MagazineGallery({ magazine }: { magazine: Magazine }) { const [view, setView] = useState(0); const labels = ["Couverture", "Ouverture", "Sommaire", "Portfolio"]; return <div className="gallery"><motion.div key={view} initial={{ opacity: 0, scale: .985 }} animate={{ opacity: 1, scale: 1 }}><MagazineCover magazine={magazine} priority view={view} /></motion.div><div className="gallery-thumbs" aria-label="Aperçus du magazine">{labels.map((label, index) => <button key={label} className={view === index ? "active" : ""} onClick={() => setView(index)} aria-pressed={view === index}><MagazineCover magazine={magazine} view={index} /><span>{label}</span></button>)}</div></div>; }
export function MagazinePurchasePanel({ magazine }: { magazine: Magazine }) { const [choice, setChoice] = useState<"issue" | "subscription">("issue"); const [added, setAdded] = useState(false); return <div className="purchase-panel"><Link href="/" className="back-link"><ArrowLeft size={15} /> Retour aux magazines</Link><p className="breadcrumbs">Magazines / {magazine.category} / {magazine.title}</p><EditorialBadge>Choix de la rédaction</EditorialBadge><h1>{magazine.title}</h1><h2>{magazine.issue}</h2><p className="publisher">Par {magazine.publisher} · {magazine.date}</p><p className="description">{magazine.description}</p><div className="purchase-options"><button className={choice === "issue" ? "selected" : ""} onClick={() => setChoice("issue")}><span>Achat à l’unité</span><strong>{formatPrice(magazine.price)}</strong><small>Accès permanent à ce numéro</small></button><button className={choice === "subscription" ? "selected" : ""} onClick={() => setChoice("subscription")}><span>Abonnement Quiosk</span><strong>9,90 € / mois</strong><small>Ce titre et plus de 80 magazines</small></button></div><button className="buy-button" onClick={() => setAdded(true)}>{added ? <><Check /> Ajouté à votre panier</> : choice === "issue" ? <>Acheter ce numéro <ArrowRight /></> : <>S’abonner <ArrowRight /></>}</button><button className="preview-button"><BookOpen /> Feuilleter un extrait</button><dl className="issue-meta"><div><dt>Langue</dt><dd>Français</dd></div><div><dt>Format</dt><dd>Numérique · 148 pages</dd></div><div><dt>Lecture</dt><dd>Web, tablette et mobile</dd></div></dl></div>; }
export function PageReveal({ children }: { children: ReactNode }) { const reduce = useReducedMotion(); return <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .55 }}>{children}</motion.div>; }
