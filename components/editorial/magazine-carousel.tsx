"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagazineCard } from "@/components/editorial/magazine";
import type { Magazine } from "@/lib/magazines";

export function MagazineCarousel({ magazines, label = "Sélection de magazines" }: { magazines: Magazine[]; label?: string }) {
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: number) => track.current?.scrollBy({ left: direction * track.current.clientWidth * 0.8, behavior: "smooth" });
  return <div className="q-carousel" role="region" aria-label={label}><div className="q-carousel__controls"><Button variant="icon" onClick={() => move(-1)} aria-label="Magazines précédents"><ChevronLeft /></Button><Button variant="icon" onClick={() => move(1)} aria-label="Magazines suivants"><ChevronRight /></Button></div><div className="q-carousel__track" ref={track}>{magazines.map((magazine) => <MagazineCard key={magazine.slug} magazine={magazine} />)}</div></div>;
}
