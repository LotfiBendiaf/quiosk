"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import {
  DEFAULT_MARKET,
  isMarketId,
  MARKETS,
  MARKET_STORAGE_KEY,
  type MarketId,
} from "@/lib/markets";

type MarketContextValue = { market: MarketId; setMarket: (value: MarketId) => void };
const MarketContext = createContext<MarketContextValue | null>(null);
const MARKET_CHANGE_EVENT = "quiosk:market-change";

export function MarketProvider({
  initialMarket = DEFAULT_MARKET,
  children,
}: {
  initialMarket?: MarketId;
  children: ReactNode;
}) {
  const market = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);
      window.addEventListener(MARKET_CHANGE_EVENT, onStoreChange);
      return () => {
        window.removeEventListener("storage", onStoreChange);
        window.removeEventListener(MARKET_CHANGE_EVENT, onStoreChange);
      };
    },
    () => {
      const savedMarket = window.localStorage.getItem(MARKET_STORAGE_KEY);
      return isMarketId(savedMarket) ? savedMarket : initialMarket;
    },
    () => initialMarket,
  );

  function selectMarket(value: MarketId) {
    window.localStorage.setItem(MARKET_STORAGE_KEY, value);
    window.dispatchEvent(new Event(MARKET_CHANGE_EVENT));
  }

  return (
    <MarketContext.Provider value={{ market, setMarket: selectMarket }}>
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() {
  const value = useContext(MarketContext);
  if (!value) throw new Error("useMarket must be rendered inside MarketProvider");
  return value;
}

export function MarketPrice({
  prices,
  indicative = false,
}: {
  prices?: Partial<Record<"DZD" | "EUR" | "USD", number>>;
  indicative?: boolean;
}) {
  const { market } = useMarket();
  const { currency, locale } = MARKETS[market];
  const value = prices?.[currency];
  if (value == null) return <span>Prix non renseigné</span>;
  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
  return (
    <span>
      {indicative && <span className="sr-only">Prix de démonstration : </span>}
      {formatted}
      {indicative && <span className="market-demo-suffix"> · démo</span>}
    </span>
  );
}
