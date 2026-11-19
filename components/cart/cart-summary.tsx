"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Trash2 } from "lucide-react";
import { useCart } from "./cart-provider";
import { useMarket } from "@/components/market/market-provider";
import { cartTotal, itemPrice } from "@/lib/cart";
import { magazines } from "@/lib/magazines";
import { MARKETS, formatMarketPrice } from "@/lib/markets";

export function CartSummary({ checkout = false }: { checkout?: boolean }) {
  const { items, remove, clear } = useCart();
  const { market } = useMarket();
  const currency = MARKETS[market].currency;
  const total = cartTotal(items, market);
  return (
    <div className="qc-layout">
      <section className="qc-items" aria-label="Articles du panier">
        <div className="qc-section-heading">
          <h2>Votre sélection</h2>
          <span>
            {items.length} article{items.length > 1 ? "s" : ""}
          </span>
        </div>
        {items.length === 0 ? (
          <div className="qc-empty">
            <p>Votre panier est vide.</p>
            <Link href="/#magazines">
              Explorer les magazines <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          items.map((item) => {
            const magazine =
              item.kind === "issue" ? magazines.find((m) => m.slug === item.slug) : null;
            const price = itemPrice(item, market);
            return (
              <article key={item.key} className="qc-item">
                <div className="qc-item__image">
                  {magazine ? (
                    <Image
                      src={magazine.image}
                      alt={`Couverture de ${magazine.title}`}
                      fill
                      sizes="100px"
                    />
                  ) : (
                    <div className="qc-item__monogram">Q.</div>
                  )}
                </div>
                <div className="qc-item__body">
                  <span className="qc-eyebrow">
                    {item.kind === "subscription" ? "Abonnement mensuel" : "Numéro numérique"}
                  </span>
                  <h3>{magazine?.title ?? "Abonnement Quiosk"}</h3>
                  <p>{magazine?.issue ?? "Formule de démonstration · renouvellement non actif"}</p>
                  <span className="qc-item__price">
                    {price === null ? "Prix non renseigné" : formatMarketPrice(price, market)}
                    {item.kind === "subscription" ? " / mois" : ""}
                  </span>
                </div>
                <button
                  type="button"
                  className="qc-remove"
                  onClick={() => remove(item.key)}
                  aria-label={`Retirer ${magazine?.title ?? "l’abonnement"} du panier`}
                >
                  <Trash2 size={18} />
                </button>
              </article>
            );
          })
        )}
        {items.length > 0 && !checkout && (
          <button type="button" className="qc-clear" onClick={clear}>
            Vider mon panier
          </button>
        )}
      </section>
      <aside className="qc-order">
        <p className="qc-eyebrow">Récapitulatif · {MARKETS[market].name}</p>
        <h2>Votre commande</h2>
        <div className="qc-order__line">
          <span>Articles</span>
          <span>{items.length}</span>
        </div>
        <div className="qc-order__line">
          <span>Devise</span>
          <span>{currency}</span>
        </div>
        <div className="qc-order__total">
          <span>Total indicatif</span>
          <strong>{total === null ? "Indisponible" : formatMarketPrice(total, market)}</strong>
        </div>
        {items.some((i) => i.kind === "subscription") && (
          <p className="qc-note">
            Le total inclut le premier mois de l’abonnement. Aucun renouvellement n’est actuellement
            activé.
          </p>
        )}
        <p className="qc-note">
          Les prix sont fictifs et propres au marché sélectionné. Aucune commande n’est enregistrée
          ni payée.
        </p>
        {!checkout && items.length > 0 && total !== null && (
          <Link className="qc-primary" href="/commande">
            Vérifier ma commande <ArrowRight size={18} />
          </Link>
        )}
        {checkout && (
          <>
            <div className="qc-checkout-notice" role="status">
              <strong>Commande en préparation</strong>
              <p>
                L’authentification, la gestion des commandes et le paiement ne sont pas encore
                connectés. Vous pouvez préparer votre sélection, mais aucune commande ne peut être
                confirmée pour le moment.
              </p>
            </div>
            <button className="qc-primary" type="button" disabled>
              Confirmer et payer — indisponible
            </button>
          </>
        )}
        <Link className="qc-continue" href="/#magazines">
          Continuer à découvrir
        </Link>
      </aside>
    </div>
  );
}
