import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, BookOpen, Compass, Eye, Layers3 } from "lucide-react";
import { SiteHeader } from "@/components/quiosk";
import { SiteFooter } from "@/components/layout/site-footer";
import { EditorialContainer } from "@/components/editorial/primitives";
import "./about.css";

export const metadata: Metadata = {
  title: "À propos | Quiosk",
  description:
    "Découvrez Quiosk, un kiosque éditorial pensé pour retrouver le plaisir de choisir, feuilleter et garder les magazines qui comptent.",
};

const principles = [
  {
    number: "01",
    icon: Eye,
    title: "Choisir avec un point de vue",
    copy: "Nous préférons une sélection courte, sensible et exigeante à l’accumulation. Chaque titre doit ouvrir une porte : sur une idée, un lieu ou une façon de vivre.",
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Respecter le temps de lire",
    copy: "Quiosk imagine une lecture sans bruit inutile. Une expérience claire, calme et généreuse, conçue pour laisser toute leur place aux images et aux mots.",
  },
  {
    number: "03",
    icon: Compass,
    title: "Relier les horizons",
    copy: "De l’Algérie au reste du monde, nous faisons dialoguer des scènes créatives, des cultures et des regards que l’on croise trop rarement au même endroit.",
  },
  {
    number: "04",
    icon: Layers3,
    title: "Faire vivre les collections",
    copy: "Un magazine n’est pas un contenu qui disparaît. C’est un objet éditorial que l’on retrouve, que l’on transmet et qui compose, numéro après numéro, une bibliothèque personnelle.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="about-page">
      <SiteHeader />
      <main>
        <section className="about-hero">
          <EditorialContainer>
            <div className="about-hero__grid">
              <div className="about-hero__copy">
                <p className="q-eyebrow">À propos de Quiosk</p>
                <h1>
                  Des magazines
                  <br />
                  pour voir le monde
                  <br />
                  <em>autrement.</em>
                </h1>
                <p className="about-hero__lede">
                  Quiosk est né d’une conviction simple : les magazines restent l’un des plus beaux
                  endroits pour prendre le temps de comprendre, de regarder et de s’émerveiller.
                </p>
                <a className="about-hero__scroll" href="#manifeste">
                  Notre manifeste <ArrowDown aria-hidden="true" />
                </a>
              </div>
              <div className="about-hero__visual">
                <div className="about-hero__image about-hero__image--main">
                  <Image
                    src="/images/Mediterranean Terrace Overlooking Algiers-3.png"
                    alt="Terrasse méditerranéenne ouverte sur Alger"
                    fill
                    priority
                    sizes="(max-width: 800px) 90vw, 48vw"
                  />
                </div>
                <div className="about-hero__image about-hero__image--detail">
                  <Image
                    src="/images/Moroccan Silver and Lavender Still Life-4.png"
                    alt="Nature morte aux objets artisanaux et fleurs lavande"
                    fill
                    sizes="(max-width: 800px) 42vw, 18vw"
                  />
                </div>
                <p>
                  Alger · Méditerranée
                  <br />
                  ouvert sur le monde
                </p>
              </div>
            </div>
          </EditorialContainer>
        </section>

        <section className="about-manifesto" id="manifeste">
          <EditorialContainer>
            <p className="q-eyebrow">Notre manifeste</p>
            <div className="about-manifesto__grid">
              <h2>
                La curiosité mérite
                <br />
                un bel <em>écrin.</em>
              </h2>
              <div>
                <p>
                  À force de tout faire défiler, on finit parfois par ne plus rien regarder. Quiosk
                  prend le chemin inverse : moins de bruit, plus de choix ; moins d’urgence, plus
                  d’attention.
                </p>
                <p>
                  Nous réunissons des magazines de mode, d’architecture, de design, de culture, de
                  voyage et d’idées. Des publications reconnues, des voix indépendantes et, demain,
                  de nouvelles histoires venues d’Algérie et de la Méditerranée.
                </p>
              </div>
            </div>
            <div className="about-manifesto__quote">
              <span>“</span>
              <blockquote>
                Feuilleter, c’est déjà voyager.
                <br />
                Lire, c’est choisir de rester un peu.
              </blockquote>
            </div>
          </EditorialContainer>
        </section>

        <section className="about-principles">
          <EditorialContainer>
            <div className="about-principles__heading">
              <p className="q-eyebrow">Ce qui nous guide</p>
              <h2>
                Une autre idée
                <br />
                du <em>kiosque.</em>
              </h2>
            </div>
            <div className="about-principles__grid">
              {principles.map(({ number, icon: Icon, title, copy }) => (
                <article key={number}>
                  <span>{number}</span>
                  <Icon aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </EditorialContainer>
        </section>

        <section className="about-origin">
          <EditorialContainer>
            <div className="about-origin__image">
              <Image
                src="/images/Algerian Heritage_ Craft and Memory-1.png"
                alt="Détail d’un intérieur algérien et de son artisanat"
                fill
                sizes="(max-width: 800px) 100vw, 45vw"
              />
            </div>
            <div className="about-origin__copy">
              <p className="q-eyebrow">Ici et ailleurs</p>
              <h2>
                Un regard ancré
                <br />
                <em>en Algérie.</em>
              </h2>
              <p>
                Quiosk se construit depuis Alger, dans une ville traversée par les langues, les
                époques et la lumière. Cet ancrage nourrit notre manière de choisir : attentive aux
                héritages, curieuse des formes nouvelles et toujours tournée vers l’ailleurs.
              </p>
              <p>
                Notre ambition est de créer un passage dans les deux sens : donner accès aux grands
                titres internationaux et offrir, progressivement, une place visible aux regards, aux
                talents et aux récits de notre région.
              </p>
              <Link className="about-text-link" href="/#algerie">
                Découvrir Regards d’Algérie <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </EditorialContainer>
        </section>

        <section className="about-method">
          <EditorialContainer>
            <div className="about-method__intro">
              <p className="q-eyebrow">Notre façon de faire</p>
              <h2>
                Choisir peu.
                <br />
                Choisir <em>bien.</em>
              </h2>
              <p>
                La sélection Quiosk suit quatre gestes simples. Ils donnent à chaque numéro une
                vraie raison d’être là.
              </p>
            </div>
            <ol>
              {[
                [
                  "Regarder",
                  "Une identité visuelle forte, un geste photographique ou une direction artistique qui marque.",
                ],
                [
                  "Écouter",
                  "Une voix éditoriale singulière, capable d’apporter de la nuance et de nouvelles perspectives.",
                ],
                [
                  "Relier",
                  "Des sujets qui font dialoguer les cultures, les disciplines et les générations.",
                ],
                [
                  "Garder",
                  "Des numéros faits pour être retrouvés demain, pas seulement parcourus aujourd’hui.",
                ],
              ].map(([title, copy], index) => (
                <li key={title}>
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </li>
              ))}
            </ol>
          </EditorialContainer>
        </section>

        <section className="about-cta">
          <EditorialContainer>
            <div className="about-cta__inner">
              <div>
                <p className="q-eyebrow">La suite s’écrit avec vous</p>
                <h2>
                  Votre prochaine
                  <br />
                  <em>lecture commence ici.</em>
                </h2>
              </div>
              <div>
                <p>
                  Parcourez la sélection, suivez vos curiosités et composez peu à peu une
                  bibliothèque qui vous ressemble.
                </p>
                <Link href="/#magazines">
                  Explorer les magazines <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          </EditorialContainer>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
