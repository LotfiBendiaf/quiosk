"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";
import { selectQuioskMarket } from "@/app/actions/market";
import { MARKETS, type MarketId } from "@/lib/markets";
import { useMarket } from "./market-provider";

/** Circular, self-contained flags; no remote assets or third-party dependencies. */
function MarketFlag({ market }: { market: MarketId }) {
  return <svg aria-hidden="true" className="q-market-flag" viewBox="0 0 32 32" focusable="false">
    <defs><clipPath id="quiosk-market-flag-circle"><circle cx="16" cy="16" r="15" /></clipPath></defs>
    <g clipPath="url(#quiosk-market-flag-circle)">
      {market === "algerie" && <><rect width="32" height="32" fill="#fff" /><rect width="16" height="32" fill="#006233" /><path d="M21 9.2a8 8 0 1 0 0 13.6 6.8 6.8 0 1 1 0-13.6" fill="#d21034" /><path d="M21.8 12l.7 3 3 .3-2.4 1.9.8 3-2.5-1.7-2.5 1.7.9-2.9-2.4-1.9 3-.3z" fill="#d21034" /></>}
      {market === "europe" && <><rect width="32" height="32" fill="#003399" />{Array.from({ length: 12 }, (_, i) => { const angle = i * Math.PI / 6 - Math.PI / 2; return <circle key={i} cx={16 + Math.cos(angle) * 8.6} cy={16 + Math.sin(angle) * 8.6} r="1.15" fill="#ffcc00" />; })}</>}
      {market === "amerique" && <><rect width="32" height="32" fill="white" />{Array.from({ length: 7 }, (_, i) => <rect key={i} x="0" y={i * 32 / 6.5} width="32" height={32 / 13} fill="#b22234" />)}<rect x="0" y="0" width="15" height="17.25" fill="#3c3b6e" />{Array.from({ length: 20 }, (_, i) => <circle key={i} cx={2.2 + (i % 4) * 3.4} cy={2.4 + Math.floor(i / 4) * 3.1} r=".55" fill="white" />)}</>}
    </g>
    <circle cx="16" cy="16" r="15" fill="none" stroke="rgba(48,36,31,.16)" />
  </svg>;
}

export function MarketSelector() {
  const { market, setMarket } = useMarket();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const root = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [open]);

  function choose(next: MarketId) {
    setOpen(false);
    if (next === market) return;
    startTransition(async () => {
      const saved = await selectQuioskMarket(next);
      setMarket(saved);
      router.refresh();
    });
  }

  return <div className="q-market" ref={root}>
    <button type="button" className="q-market__trigger" aria-label={`Marché : ${MARKETS[market].name} (${MARKETS[market].currency}). Changer de marché`} aria-haspopup="menu" aria-expanded={open} aria-controls="quiosk-market-menu" disabled={pending} onClick={() => setOpen(v => !v)}>
      <MarketFlag market={market} /><ChevronDown aria-hidden="true" size={14} />
    </button>
    {open && <div className="q-market__popover" role="menu" id="quiosk-market-menu" aria-label="Choisir votre marché">
      <p className="q-market__eyebrow">Votre région</p>
      <p className="q-market__intro">Choisissez votre marché pour afficher les prix dans la devise correspondante.</p>
      {Object.values(MARKETS).map(item => <button type="button" role="menuitemradio" aria-checked={market === item.slug} className="q-market__option" key={item.slug} onClick={() => choose(item.slug)}>
        <MarketFlag market={item.slug} />
        <span className="q-market__option-label"><strong>{item.name}</strong><small>{item.currency}</small></span>
        {market === item.slug && <Check size={16} aria-hidden="true" />}
      </button>)}
      <p className="q-market__foot">Prix indicatifs pour la démonstration. Aucun achat disponible actuellement.</p>
    </div>}
  </div>;
}
