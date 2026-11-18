"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MarketSelector } from "@/components/market/market-selector";
import { CartLink } from "@/components/cart/cart-link";

const links = [["Découvrir", "/#decouvrir"], ["Magazines", "/#magazines"], ["Catégories", "/#categories"], ["Éditeurs", "/#editeurs"], ["Abonnements", "/#abonnements"]] as const;

export function SiteHeader({ embedded = false }: { embedded?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 16); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  return <header className={cn("q-header", embedded && "q-header--embedded", scrolled && "is-scrolled")}><div className="q-header__inner"><Link href="/" className="q-wordmark" aria-label="Quiosk, accueil">QUIOSK</Link><div className="q-header__right"><nav className={cn("q-nav", open && "is-open")} aria-label="Navigation principale">{links.map(([label, href]) => <Link key={label} href={href} onClick={() => setOpen(false)}>{label}</Link>)}</nav><div className="q-header__actions"><MarketSelector /><Button variant="ghost" size="sm" className="q-header__text-action" aria-label="Recherche bientôt disponible" title="Bientôt disponible" disabled><Search /> <span>Rechercher</span></Button><Button asChild variant="ghost" size="sm" className="q-header__text-action"><Link href="/auth?mode=login"><UserRound /> <span>Mon compte</span></Link></Button><CartLink className="q-bag" /><Button variant="icon" className="q-menu-button" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div></div></div></header>;
}
