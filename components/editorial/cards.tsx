import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function CategoryCard({ title, description, index, position = "0% 0%" }: { title: string; description: string; index: number; position?: string }) {
  return <Link href="#" className="q-category-card"><div className="q-category-card__image"><Image src="/images/editorial-sheet.png" alt="" fill sizes="(max-width: 700px) 90vw, 30vw" style={{ objectPosition: position }} /></div><span className="q-caption">0{index}</span><h3 className="q-h3">{title}</h3><p>{description}</p><ArrowUpRight aria-hidden="true" /></Link>;
}

export function PublisherCard({ name, specialty, count }: { name: string; specialty: string; count: number }) {
  return <article className="q-publisher-card"><div className="q-publisher-card__monogram" aria-hidden="true">{name.slice(0, 1)}</div><div><p className="q-eyebrow">Maison d’édition</p><h3 className="q-h3">{name}</h3><p className="q-body-sm">{specialty} · {count} publications</p></div><ArrowUpRight aria-hidden="true" /></article>;
}
