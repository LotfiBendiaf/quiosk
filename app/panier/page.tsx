import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/quiosk";
import { CartSummary } from "@/components/cart/cart-summary";
import { EditorialContainer } from "@/components/editorial/primitives";

export const metadata: Metadata = { title: "Mon panier" };
export default function CartPage() {
  return (
    <>
      <SiteHeader />
      <main className="qc-page">
        <EditorialContainer>
          <p className="qc-eyebrow">Votre bibliothèque commence ici</p>
          <h1>
            Mon <em>panier.</em>
          </h1>
          <CartSummary />
        </EditorialContainer>
      </main>
      <SiteFooter />
    </>
  );
}
