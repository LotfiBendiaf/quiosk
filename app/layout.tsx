import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { MarketProvider } from "@/components/market/market-provider";
import { CartProvider } from "@/components/cart/cart-provider";
import { CookieConsentManager } from "@/components/privacy/cookie-consent";

const sans = Geist({ variable: "--font-geist", subsets: ["latin"] });
const serif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: { default: "Quiosk — Le plaisir de lire, réinventé", template: "%s · Quiosk" },
  description:
    "Découvrez une sélection de magazines d’exception et composez votre bibliothèque numérique.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <MarketProvider>
          <CartProvider>{children}</CartProvider>
        </MarketProvider>
        <CookieConsentManager />
      </body>
    </html>
  );
}
