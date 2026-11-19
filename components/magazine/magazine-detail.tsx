"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  LibraryBig,
  LockKeyhole,
  Sparkles,
} from "lucide-react";
import type { Magazine } from "@/lib/magazines";
import { MarketPrice } from "@/components/market/market-provider";
import { demoSubscriptionPrices } from "@/lib/pricing";
import { useCart } from "@/components/cart/cart-provider";
import { useRouter } from "next/navigation";

type PurchaseMode = "issue" | "subscription";

export function MagazineDetail({ magazine }: { magazine: Magazine }) {
  const [mode, setMode] = useState<PurchaseMode>("issue");
  const { addIssue, addSubscription, has } = useCart();
  const router = useRouter();
  const isInCart = has(mode === "issue" ? `issue:${magazine.slug}` : "subscription:quiosk");
  function addToCart() {
    if (mode === "issue") addIssue(magazine.slug);
    else addSubscription();
    router.push("/panier");
  }
  const isIssue = mode === "issue";
  const currentPrices = isIssue ? magazine.prices : demoSubscriptionPrices;

  return (
    <div className="qd-layout">
      <div className="qd-gallery">
        <div className="qd-gallery__stage">
          <span className="qd-gallery__index">QUIOSK / COLLECTION 001</span>
          <div className="qd-gallery__cover">
            <Image
              src={magazine.image}
              alt={`Couverture du magazine ${magazine.title}, ${magazine.issue}`}
              fill
              priority
              sizes="(max-width: 800px) 75vw, 36vw"
              className="qd-gallery__image"
            />
          </div>
          <span className="qd-gallery__edition">ÉDITION NUMÉRIQUE</span>
        </div>
        <p className="qd-gallery__note">
          <BookOpen aria-hidden="true" size={16} /> La couverture est disponible en aperçu. Les
          pages intérieures ne sont pas encore accessibles.
        </p>
      </div>
      <section className="qd-info" aria-labelledby="qd-title">
        <Link href="/#magazines" className="qd-back">
          <ArrowLeft size={16} aria-hidden="true" /> Tous les magazines
        </Link>
        <div className="qd-breadcrumb">
          <span>Magazines</span>
          <span aria-hidden="true">/</span>
          <span>{magazine.category}</span>
        </div>
        <p className="qd-eyebrow">Sélection éditoriale · Démonstration</p>
        <h1 id="qd-title" className="qd-title">
          {magazine.title}
        </h1>
        <p className="qd-issue">{magazine.issue}</p>
        <div className="qd-meta">
          <span>{magazine.publisher}</span>
          <span aria-hidden="true">·</span>
          <span>{magazine.date}</span>
        </div>
        <p className="qd-description">{magazine.description}</p>

        <div className="qd-commerce">
          <div className="qd-commerce__heading">
            <span>Choisissez votre expérience</span>
            <span>01 / 02</span>
          </div>
          <div className="qd-options" role="group" aria-label="Mode d'acquisition du magazine">
            <button
              type="button"
              aria-pressed={isIssue}
              className={`qd-option ${isIssue ? "is-active" : ""}`}
              onClick={() => setMode("issue")}
            >
              <span className="qd-option__top">
                <span className="qd-radio" aria-hidden="true">
                  {isIssue && <Check size={12} />}
                </span>
                <span className="qd-option__name">Acheter ce numéro</span>
              </span>
              <strong className="qd-option__price">
                <MarketPrice prices={magazine.prices} indicative />
              </strong>
              <span className="qd-option__hint">Un seul numéro, dans votre bibliothèque</span>
            </button>
            <button
              type="button"
              aria-pressed={!isIssue}
              className={`qd-option ${!isIssue ? "is-active" : ""}`}
              onClick={() => setMode("subscription")}
            >
              <span className="qd-option__top">
                <span className="qd-radio" aria-hidden="true">
                  {!isIssue && <Check size={12} />}
                </span>
                <span className="qd-option__name">S’abonner</span>
              </span>
              <strong className="qd-option__price">
                <MarketPrice prices={demoSubscriptionPrices} indicative />
                <small> / mois</small>
              </strong>
              <span className="qd-option__hint">Formule d’abonnement à confirmer</span>
            </button>
          </div>

          <div className="qd-selected" aria-live="polite" aria-atomic="true" key={mode}>
            <div className="qd-selected__intro">
              <span className="qd-eyebrow">
                {isIssue ? "Achat à l’unité" : "Abonnement Quiosk"}
              </span>
              <p>
                {isIssue
                  ? "Pour conserver le numéro qui vous inspire."
                  : "Pour suivre vos lectures et découvrir de nouveaux horizons."}
              </p>
            </div>
            <div className="qd-selected__price">
              <MarketPrice prices={currentPrices} indicative />
              {!isIssue && <small> / mois</small>}
            </div>
            <ul className="qd-benefits">
              {(isIssue
                ? [
                    "Un numéro sélectionné",
                    "Ajout à votre bibliothèque après achat",
                    "Accès selon la licence du numéro",
                  ]
                : [
                    "Abonnement mensuel envisagé",
                    "Catalogue éligible à confirmer",
                    "Conditions d’accès communiquées au lancement",
                  ]
              ).map((label) => (
                <li key={label}>
                  <Check size={15} aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
            <button type="button" className="qd-main-cta" onClick={addToCart}>
              {isInCart
                ? "Voir dans mon panier"
                : isIssue
                  ? "Ajouter ce numéro au panier"
                  : "Ajouter l’abonnement au panier"}
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <p className="qd-unavailable">
              <LockKeyhole size={14} aria-hidden="true" /> Panier de démonstration : aucun paiement
              ou droit de lecture n’est activé.
            </p>
          </div>
        </div>

        <div className="qd-features" aria-label="L’expérience Quiosk">
          <div>
            <LibraryBig size={19} aria-hidden="true" />
            <span>Votre future bibliothèque numérique</span>
          </div>
          <div>
            <Sparkles size={19} aria-hidden="true" />
            <span>Une sélection éditoriale soignée</span>
          </div>
        </div>
      </section>
    </div>
  );
}
