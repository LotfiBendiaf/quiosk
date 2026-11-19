import { notFound } from "next/navigation";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  EditorialBadge,
  EditorialContainer,
  EditorialDivider,
  SectionHeading,
} from "@/components/editorial/primitives";
import { MagazineCard } from "@/components/editorial/magazine";
import { MagazineCarousel } from "@/components/editorial/magazine-carousel";
import { CategoryCard, PublisherCard } from "@/components/editorial/cards";
import {
  MagazinePreviewButton,
  PriceDisplay,
  PurchaseButton,
  SubscriptionOption,
} from "@/components/commerce/commerce";
import { FormField, NewsletterInput, SearchInput } from "@/components/forms/inputs";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { EmptyState, LoadingState } from "@/components/layout/states";
import { magazines } from "@/lib/magazines";

export const metadata = { title: "Système de design", robots: { index: false, follow: false } };

const colors = [
  ["Crème", "var(--color-cream)", "Fond principal"],
  ["Ivoire", "var(--color-ivory)", "Surfaces élevées"],
  ["Lavande", "var(--color-lavender)", "Actions principales"],
  ["Brume lavande", "var(--color-lavender-mist)", "Mises en valeur"],
  ["Prune profond", "var(--color-deep-plum)", "Accents forts"],
  ["Brun éditorial", "var(--color-editorial-brown)", "Texte principal"],
  ["Atténué", "var(--color-muted)", "Texte secondaire"],
  ["Bordure", "var(--color-border)", "Séparateurs"],
] as const;

export default function DesignSystemPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <div className="q-showcase">
      <SiteHeader embedded />
      <main>
        <EditorialContainer>
          <header className="q-showcase__intro">
            <EditorialBadge tone="mist">Fondation visuelle · Phase 1</EditorialBadge>
            <p className="q-eyebrow">Système de design Quiosk</p>
            <h1 className="q-display">
              Le plaisir de <em>lire</em>,<br />
              dans ses moindres détails.
            </h1>
            <p className="q-body q-showcase__lede">
              Une grammaire chaleureuse et contemporaine pour une bibliothèque éditoriale française,
              pensée pour durer sur tous les écrans.
            </p>
          </header>

          <section className="q-showcase__section">
            <SectionHeading
              eyebrow="01 · Couleur"
              title="Une palette douce,"
              emphasis="jamais timide."
            />
            <div className="q-swatches">
              {colors.map(([name, color, purpose]) => (
                <article key={name}>
                  <div style={{ background: color }} />
                  <strong>{name}</strong>
                  <span>{color}</span>
                  <p>{purpose}</p>
                </article>
              ))}
            </div>
          </section>

          <EditorialDivider label="Typographie" />
          <section className="q-showcase__section q-type-specimen">
            <p className="q-eyebrow">02 · Échelle typographique</p>
            <div>
              <span>Display</span>
              <p className="q-display">L’art de choisir.</p>
            </div>
            <div>
              <span>H1</span>
              <h1 className="q-h1">Une bibliothèque singulière.</h1>
            </div>
            <div>
              <span>H2</span>
              <h2 className="q-h2">
                Curiosité <em>sans limites.</em>
              </h2>
            </div>
            <div>
              <span>H3</span>
              <h3 className="q-h3">Le numéro du mois</h3>
            </div>
            <div>
              <span>Corps</span>
              <p className="q-body">
                Des revues choisies pour la force de leur regard, leur beauté graphique et la
                qualité de leurs récits.
              </p>
            </div>
            <div>
              <span>Légende</span>
              <p className="q-caption">Architecture · Volume 08 · Novembre 2026</p>
            </div>
          </section>

          <section className="q-showcase__section">
            <SectionHeading eyebrow="03 · Actions" title="Des gestes" emphasis="évidents." />
            <div className="q-component-row">
              <Button>
                Explorer <ArrowRight />
              </Button>
              <Button variant="secondary">Voir la collection</Button>
              <Button variant="ghost">Action discrète</Button>
              <Button variant="icon" aria-label="Ajouter aux favoris">
                <Heart />
              </Button>
              <Button disabled>Indisponible</Button>
            </div>
            <div className="q-component-row">
              <EditorialBadge>Choix de la rédaction</EditorialBadge>
              <EditorialBadge tone="mist">Nouveau</EditorialBadge>
              <EditorialBadge tone="plum">Exclusivité</EditorialBadge>
            </div>
          </section>

          <section className="q-showcase__section">
            <SectionHeading eyebrow="04 · Formulaires" title="Clairs, calmes," emphasis="précis." />
            <div className="q-form-grid">
              <SearchInput />
              <NewsletterInput />
              <FormField label="Votre nom" hint="Requis">
                <Input placeholder="Camille Laurent" />
              </FormField>
              <FormField label="Adresse e-mail" error="Saisissez une adresse e-mail valide.">
                <Input aria-invalid="true" defaultValue="camille@" />
              </FormField>
            </div>
          </section>

          <section className="q-showcase__section">
            <SectionHeading
              eyebrow="05 · Éditorial"
              title="Des couvertures qui"
              emphasis="respirent."
              action={{ label: "Voir la collection", href: "#" }}
            />
            <div className="q-magazine-grid">
              {magazines.slice(0, 3).map((magazine, index) => (
                <MagazineCard key={magazine.slug} magazine={magazine} featured={index === 0} />
              ))}
            </div>
            <MagazineCarousel magazines={magazines} />
          </section>

          <section className="q-showcase__section">
            <SectionHeading eyebrow="06 · Explorer" title="Suivre sa" emphasis="curiosité." />
            <div className="q-category-grid">
              <CategoryCard
                index={1}
                title="Mode & création"
                description="Le style comme langage"
                position="0% 0%"
              />
              <CategoryCard
                index={2}
                title="Architecture"
                description="Des espaces qui nous façonnent"
                position="50% 0%"
              />
              <CategoryCard
                index={3}
                title="Design"
                description="Des objets qui ont du sens"
                position="100% 0%"
              />
            </div>
            <div className="q-publisher-grid">
              <PublisherCard name="Maison Élan" specialty="Mode & culture" count={12} />
              <PublisherCard name="Atelier Press" specialty="Architecture & design" count={8} />
            </div>
          </section>

          <section className="q-showcase__section">
            <SectionHeading
              eyebrow="07 · Commerce"
              title="Acheter sans"
              emphasis="rompre le charme."
            />
            <div className="q-commerce-grid">
              <div className="q-commerce-panel">
                <PriceDisplay price="14,90 €" previousPrice="18,00 €" />
                <div className="q-component-row">
                  <PurchaseButton />
                  <MagazinePreviewButton />
                </div>
              </div>
              <SubscriptionOption
                title="Achat à l’unité"
                price="14,90 €"
                detail="Accès permanent à ce numéro"
                selected
              />
              <SubscriptionOption
                title="Abonnement Quiosk"
                price="9,90 € / mois"
                detail="Plus de 80 magazines"
              />
            </div>
          </section>

          <section className="q-showcase__section">
            <SectionHeading eyebrow="08 · États" title="Présent, même dans" emphasis="l’attente." />
            <div className="q-states-grid">
              <LoadingState />
              <EmptyState />
            </div>
          </section>

          <section className="q-showcase__section">
            <SectionHeading
              eyebrow="09 · Formes & rythme"
              title="Une géométrie"
              emphasis="souple."
            />
            <div className="q-shape-grid">
              <div className="q-radius q-radius--sm">12 px</div>
              <div className="q-radius q-radius--md">16 px</div>
              <div className="q-radius q-radius--lg">20 px</div>
              <div className="q-radius q-radius--pill">Pilule</div>
            </div>
            <div className="q-spacing-scale">
              {[4, 8, 12, 16, 24, 32, 48, 64].map((space) => (
                <div key={space}>
                  <span>{space}</span>
                  <i style={{ width: space }} />
                </div>
              ))}
            </div>
          </section>

          <section className="q-showcase__section">
            <SectionHeading
              eyebrow="10 · Navigation"
              title="Le cadre de"
              emphasis="l’expérience."
            />
            <div className="q-header-preview">
              <SiteHeader embedded />
            </div>
            <div className="q-component-row">
              <Button variant="secondary">
                <ShoppingBag /> Panier · 2
              </Button>
            </div>
          </section>
        </EditorialContainer>
      </main>
      <SiteFooter />
    </div>
  );
}
