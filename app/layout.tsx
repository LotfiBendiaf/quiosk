import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { MarketProvider } from "@/components/market/market-provider";
import { DEFAULT_MARKET, isMarketId, MARKET_COOKIE } from "@/lib/markets";

const sans = Geist({ variable: "--font-geist", subsets: ["latin"] });
const serif = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });

export const metadata: Metadata = { title: { default: "Quiosk — Le plaisir de lire, réinventé", template: "%s · Quiosk" }, description: "Découvrez une sélection de magazines d’exception et composez votre bibliothèque numérique." };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const savedMarket = (await cookies()).get(MARKET_COOKIE)?.value;
  const market = isMarketId(savedMarket) ? savedMarket : DEFAULT_MARKET;
  return <html lang="fr" className={`${sans.variable} ${serif.variable}`}><body><MarketProvider initialMarket={market}>{children}</MarketProvider></body></html>;
}
