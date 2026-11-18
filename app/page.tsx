import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Bookmark, Check, Compass, MoveRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditorialContainer, SectionHeading } from "@/components/editorial/primitives";
import { MagazineCover } from "@/components/editorial/magazine";
import { MagazineCarousel } from "@/components/editorial/magazine-carousel";
import { SiteHeader } from "@/components/quiosk";
import { SiteFooter } from "@/components/layout/site-footer";
import { CoverReveal, HeroMotion, HeroReveal, NewsletterForm } from "@/components/home/home-interactions";
import { algerianEditions, magazines } from "@/lib/magazines";
import "./home.css";

const categories = [
  ["Mode", "/images/Sunlit Mediterranean Terrace Portrait-1.png"], ["Architecture", "/images/Mediterranean Terrace Overlooking Algiers-3.png"],
  ["Design", "/images/Moroccan Silver and Lavender Still Life-4.png"], ["Art & Culture", "/images/images6.jpeg"],
  ["Voyage", "/images/images2.jpeg"], ["Lifestyle", "/images/images4.jpeg"], ["Business", "/images/images8.jpeg"], ["Technologie", "/images/images5.jpeg"],
] as const;

const articles = [
  { type: "Conversation", title: "Pourquoi le papier continue de nous émouvoir", image: "/images/images.jpeg", large: true },
  { type: "Architecture", title: "Alger, la lumière comme matière", image: "/images/Mediterranean Terrace Overlooking Algiers-3.png" },
  { type: "Savoir-faire", title: "Les gestes qui traversent le temps", image: "/images/Algerian Heritage_ Craft and Memory-1.png" },
];

const magazineTitles = [
  "Vogue", "Monocle", "Kinfolk", "TIME", "National Geographic", "Wired",
  "The New Yorker", "ELLE", "Architectural Digest", "Forbes",
] as const;

const subscriptionPlans = [
  { name: "À l’unité", price: "À définir", cadence: "par numéro", description: "Choisissez uniquement les éditions qui vous intéressent.", features: ["Achat d’un numéro", "Accès selon les droits de l’édition", "Bibliothèque personnelle à venir"], cta: "Être informé", featured: false },
  { name: "Abonnement", price: "À définir", cadence: "modalités à venir", description: "Suivez vos publications préférées avec une formule adaptée.", features: ["Formules en cours de préparation", "Accès défini selon les éditeurs", "Conditions communiquées au lancement"], cta: "Être informé", featured: true },
  { name: "Collections", price: "À définir", cadence: "modalités à venir", description: "Découvrez des sélections éditoriales imaginées autour de vos passions.", features: ["Sélections thématiques envisagées", "Disponibilité à confirmer", "Tarifs annoncés prochainement"], cta: "Être informé", featured: false },
] as const;

function Cta({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" | "dark" }) {
  return <Button asChild variant={variant} size="lg"><Link href={href}>{children}<ArrowRight aria-hidden="true" /></Link></Button>;
}

export default function Home() {
  return <div className="home"><SiteHeader /><main>
    <section className="home-hero" id="decouvrir"><EditorialContainer><HeroMotion>
      <div className="home-hero__lines" aria-hidden="true"><svg viewBox="0 0 1600 800" preserveAspectRatio="none"><path d="M-80 80 C120 5 260 155 460 80 S800 5 1000 80 1340 155 1680 80" /><path d="M-80 180 C100 95 280 265 480 180 S820 95 1020 180 1360 265 1680 180" /><path d="M-80 280 C140 190 260 370 500 280 S840 190 1040 280 1380 370 1680 280" /><path d="M-80 380 C100 285 300 475 500 380 S820 285 1040 380 1380 475 1680 380" /><path d="M-80 480 C140 390 280 570 500 480 S840 390 1060 480 1380 570 1680 480" /><path d="M-80 580 C100 490 300 670 520 580 S860 490 1080 580 1400 670 1680 580" /><path d="M-80 680 C140 590 300 770 520 680 S860 590 1080 680 1400 770 1680 680" /></svg></div>
      <div className="home-hero__copy"><HeroReveal><p className="q-eyebrow">Votre nouvel univers éditorial</p></HeroReveal><HeroReveal><h1 className="q-display">Le plaisir de lire, <em>réinventé.</em></h1></HeroReveal><HeroReveal><p className="home-hero__lede">Explorez une sélection de magazines d’exception. Découvrez de nouvelles perspectives et composez votre bibliothèque numérique.</p></HeroReveal><HeroReveal className="home-hero__actions"><Cta href="#magazines">Explorer les magazines</Cta><Cta href="#experience" variant="secondary">Découvrir Quiosk</Cta></HeroReveal><HeroReveal className="home-hero__moods"><span><Sparkles /> À feuilleter</span><span>À garder</span><span>À partager</span></HeroReveal></div>
      <div className="home-hero__art" aria-label="Une sélection de couvertures Quiosk"><span className="home-hero__sun" aria-hidden="true">La curiosité<br />fait du bien</span>{magazines.slice(0, 5).map((magazine, i) => <CoverReveal key={magazine.slug} className={`home-hero__cover home-hero__cover--${i + 1}`} index={i}><MagazineCover magazine={magazine} priority={i < 3} /></CoverReveal>)}</div>
    </HeroMotion></EditorialContainer></section>

    <section className="home-press" aria-label="Magazines disponibles sur Quiosk">
      <p className="home-press__label">Les titres qui inspirent le monde</p>
      <div className="home-press__viewport">
        <div className="home-press__track">
          <div className="home-press__group" role="list">
            {magazineTitles.map((title, index) => <span className={`home-press__name home-press__name--${index + 1}`} role="listitem" key={title}>{title}</span>)}
          </div>
          <div className="home-press__group" aria-hidden="true">
            {magazineTitles.map((title, index) => <span className={`home-press__name home-press__name--${index + 1}`} key={title}>{title}</span>)}
          </div>
        </div>
      </div>
    </section>

    <section className="home-section home-featured" id="magazines"><EditorialContainer><div className="home-section__intro"><SectionHeading eyebrow="À la une" title="Les numéros qui font" emphasis="l’époque." /><p>Une sélection de regards indépendants, choisie pour sa beauté et la force de ses idées.</p></div><MagazineCarousel magazines={magazines.slice(0, 6)} label="Magazines à la une" /></EditorialContainer></section>

    <section className="home-section home-universes" id="categories"><EditorialContainer><SectionHeading eyebrow="Explorez nos univers" title="Suivez votre" emphasis="curiosité." /><div className="home-universes__grid">{categories.map(([name, image], index) => <Link href="#magazines" className={`home-universe home-universe--${index + 1}`} key={name}><Image src={image} alt="" fill sizes="(max-width: 700px) 90vw, 32vw" /><span>0{index + 1}</span><h3>{name}</h3><ArrowRight aria-hidden="true" /></Link>)}</div></EditorialContainer></section>

    <section className="home-membership" id="abonnements">
      <div className="home-membership__heading"><p className="q-eyebrow">La sélection Quiosk</p><h2 className="q-display">Un kiosque qui ne<br /><em>s’arrête jamais.</em></h2><p>Des couvertures iconiques, des voix indépendantes et de nouvelles perspectives à retrouver chaque semaine.</p></div>
      <div className="home-marquee" aria-label="Sélection de magazines en mouvement">
        {[magazines, [...magazines].reverse()].map((row, rowIndex) => <div className={`home-marquee__row home-marquee__row--${rowIndex + 1}`} key={rowIndex}><div className="home-marquee__track">{[...row, ...row].map((magazine, index) => <Link href={`/magazines/${magazine.slug}`} className="home-marquee__item" key={`${rowIndex}-${magazine.slug}-${index}`} aria-hidden={index >= row.length} tabIndex={index >= row.length ? -1 : undefined}><MagazineCover magazine={magazine} /><span>{magazine.title}</span></Link>)}</div></div>)}
      </div>
      <EditorialContainer className="home-pricing"><div className="home-pricing__intro"><p className="q-eyebrow">Nos abonnements</p><h2 className="q-h1">Choisissez votre façon <em>de lire.</em></h2><p>Les formules et leurs conditions sont en cours de définition. Inscrivez-vous pour suivre leur lancement.</p></div><div className="home-pricing__grid">{subscriptionPlans.map((plan) => <article className={plan.featured ? "is-featured" : ""} key={plan.name}>{plan.featured && <span className="home-pricing__badge">À l’étude</span>}<p className="home-pricing__name">{plan.name}</p><div className="home-pricing__price"><strong>{plan.price}</strong><span>{plan.cadence}</span></div><p className="home-pricing__description">{plan.description}</p><ul>{plan.features.map(feature => <li key={feature}><Check aria-hidden="true" />{feature}</li>)}</ul><Cta href="#newsletter" variant={plan.featured ? "primary" : "dark"}>{plan.cta}</Cta></article>)}</div><p className="home-pricing__note">Présentation conceptuelle : aucune formule, aucun tarif et aucun droit d’accès ne sont encore commercialisés.</p></EditorialContainer>
    </section>

    <section className="home-algeria" id="algerie"><EditorialContainer><div className="home-algeria__heading"><p className="q-eyebrow">Édition spéciale</p><h2 className="q-display">Regards <em>d’Algérie</em></h2><p>Des voix, des lieux et des inspirations qui racontent la richesse d’une culture.</p></div><div className="home-algeria__covers">{algerianEditions.map((magazine, index) => <article key={magazine.slug} className={`home-algeria__item item-${index + 1}`}><MagazineCover magazine={magazine} /><div><span>{magazine.category}</span><h3>{magazine.title}</h3><p>{magazine.issue}</p></div></article>)}</div><p className="home-algeria__disclaimer">Collection éditoriale fictive créée pour illustrer l’univers Quiosk — non disponible à la vente.</p></EditorialContainer></section>

    <section className="home-section home-selection" id="editeurs"><EditorialContainer><div className="home-selection__grid"><div className="home-selection__feature"><MagazineCover magazine={magazines[2]} /></div><div className="home-selection__story"><p className="q-eyebrow">Notre sélection</p><h2 className="q-h1">Habiter le monde <em>autrement.</em></h2><p>Ce mois-ci, la rédaction explore les intérieurs qui racontent une vie. Des maisons imparfaites, sensibles, où chaque objet porte la trace d’un geste.</p><Cta href={`/magazines/${magazines[2].slug}`} variant="secondary">Découvrir ce numéro</Cta><div className="home-selection__support">{magazines.slice(5, 8).map(magazine => <Link href={`/magazines/${magazine.slug}`} key={magazine.slug}><MagazineCover magazine={magazine} /><span>{magazine.title}</span></Link>)}</div></div></div></EditorialContainer></section>

    <section className="home-section home-latest"><EditorialContainer><SectionHeading eyebrow="Les derniers numéros" title="Fraîchement" emphasis="parus." /><MagazineCarousel magazines={[...magazines].reverse()} label="Les derniers numéros" /></EditorialContainer></section>

    <section className="home-experience" id="experience"><EditorialContainer><div className="home-experience__heading"><p className="q-eyebrow">L’expérience Quiosk</p><h2 className="q-h1">Une autre façon de vivre <em>les magazines.</em></h2></div><div className="home-experience__steps">{[[Compass, "01", "Découvrez", "Parcourez des magazines et des collections éditoriales choisies."], [Bookmark, "02", "Collectionnez", "À terme, composez une bibliothèque personnelle numéro après numéro."], [BookOpen, "03", "Lisez", "Bientôt, profitez d’une expérience de lecture numérique calme et immersive."]].map(([Icon, number, title, copy]) => { const StepIcon = Icon as typeof Compass; return <article key={String(number)}><span>{String(number)}</span><StepIcon aria-hidden="true" /><h3>{String(title)}</h3><p>{String(copy)}</p></article>; })}</div></EditorialContainer></section>

    <section className="home-section home-journal" id="journal"><EditorialContainer><SectionHeading eyebrow="Le journal" title="À lire entre" emphasis="les lignes." /><div className="home-journal__grid">{articles.map(article => <article className={article.large ? "is-featured" : ""} key={article.title}><div className="home-journal__image"><Image src={article.image} alt="" fill sizes={article.large ? "(max-width: 800px) 100vw, 58vw" : "(max-width: 800px) 100vw, 28vw"} /></div><span>{article.type} · 6 min</span><h3>{article.title}</h3><span className="home-journal__link">Lire bientôt <MoveRight /></span></article>)}</div></EditorialContainer></section>

    <section className="home-newsletter" id="newsletter"><EditorialContainer><div><p className="q-eyebrow">La lettre Quiosk</p><h2 className="q-h1">Un peu d’inspiration dans <em>votre boîte mail.</em></h2></div><NewsletterForm /></EditorialContainer></section>
  </main><SiteFooter /></div>;
}
