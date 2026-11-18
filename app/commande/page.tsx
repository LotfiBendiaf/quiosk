import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/quiosk";
import { CartSummary } from "@/components/cart/cart-summary";
import { EditorialContainer } from "@/components/editorial/primitives";

export const metadata: Metadata = { title: "Récapitulatif de commande" };
export default function CheckoutPage() {
  return <><SiteHeader /><main className="qc-page"><EditorialContainer><p className="qc-eyebrow">Étape suivante · Vérification</p><h1>Votre <em>commande.</em></h1><CartSummary checkout /></EditorialContainer></main><SiteFooter /></>;
}
