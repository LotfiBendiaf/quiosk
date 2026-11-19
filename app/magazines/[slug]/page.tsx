import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  EditorialContainer,
  MagazineCard,
  PageReveal,
  SectionHeading,
  SiteFooter,
  SiteHeader,
} from "@/components/quiosk";
import { getMagazine, magazines } from "@/lib/magazines";
import { MagazineDetail } from "@/components/magazine/magazine-detail";

export const dynamicParams = false;
export function generateStaticParams() {
  return magazines.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const magazine = getMagazine((await params).slug);
  return magazine
    ? { title: `${magazine.title} — ${magazine.issue}`, description: magazine.description }
    : {};
}
export default async function MagazinePage({ params }: { params: Promise<{ slug: string }> }) {
  const magazine = getMagazine((await params).slug);
  if (!magazine) notFound();
  const related = magazines.filter(({ slug }) => slug !== magazine.slug).slice(0, 3);
  return (
    <PageReveal>
      <SiteHeader />
      <main className="detail-main">
        <EditorialContainer>
          <MagazineDetail magazine={magazine} />
        </EditorialContainer>
        <section className="section related">
          <EditorialContainer>
            <SectionHeading
              eyebrow="À découvrir aussi"
              title="Poursuivez votre"
              italic="lecture."
            />
            <div className="mag-grid three">
              {related.map((item, index) => (
                <MagazineCard key={item.slug} magazine={item} index={index} />
              ))}
            </div>
          </EditorialContainer>
        </section>
      </main>
      <SiteFooter />
    </PageReveal>
  );
}
