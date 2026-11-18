"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { DEFAULT_MARKET, MARKETS, type MarketId } from "@/lib/markets";

type MarketContextValue = { market: MarketId; setMarket: (value: MarketId) => void };
const MarketContext = createContext<MarketContextValue | null>(null);

export function MarketProvider({ initialMarket = DEFAULT_MARKET, children }: { initialMarket?: MarketId; children: ReactNode }) {
  const [market, setMarket] = useState<MarketId>(initialMarket);
  return <MarketContext.Provider value={{ market, setMarket }}>{children}</MarketContext.Provider>;
}

export function useMarket() {
  const value = useContext(MarketContext);
  if (!value) throw new Error("useMarket must be rendered inside MarketProvider");
  return value;
}

export function MarketPrice({ prices, indicative = false }: { prices?: Partial<Record<"DZD" | "EUR" | "USD", number>>; indicative?: boolean }) {
  const { market } = useMarket();
  const { currency, locale } = MARKETS[market];
  const value = prices?.[currency];
  if (value == null) return <span>Prix non renseigné</span>;
  const formatted = new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 2 }).format(value);
  return <span>{indicative && <span className="sr-only">Prix de démonstration : </span>}{formatted}{indicative && <span className="market-demo-suffix"> · démo</span>}</span>;
}
