import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Magazine } from "@/lib/magazines";
import { formatPrice } from "@/lib/magazines";
import { cn } from "@/lib/utils";

export function MagazineCover({ magazine, className, priority = false }: { magazine: Magazine; className?: string; priority?: boolean; view?: number }) {
  return (
    <div className={cn("q-cover", className)}>
      <Image src={magazine.image} alt={`Couverture de ${magazine.title}, ${magazine.issue}`} fill priority={priority} sizes="(max-width: 700px) 72vw, 24vw" />
    </div>
  );
}

export function MagazineCard({ magazine, featured = false }: { magazine: Magazine; featured?: boolean }) {
  return (
    <article className={cn("q-magazine-card q-reveal", featured && "q-magazine-card--featured")}>
      <Link href={`/magazines/${magazine.slug}`} className="q-magazine-card__media">
        <MagazineCover magazine={magazine} />
        <span className="q-cover-action">Voir le numéro <ArrowRight aria-hidden="true" size={15} /></span>
      </Link>
      <div className="q-magazine-card__meta"><span>{magazine.category}</span>{magazine.price != null && <span>{formatPrice(magazine.price)}</span>}</div>
      <h3 className="q-h3"><Link href={`/magazines/${magazine.slug}`}>{magazine.title}</Link></h3>
      <p className="q-caption">{magazine.issue}</p>
    </article>
  );
}
