"use client";

import { useState } from "react";
import { ArrowRight, BookOpen, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PriceDisplay({
  price,
  previousPrice,
  suffix,
}: {
  price: string;
  previousPrice?: string;
  suffix?: string;
}) {
  return (
    <p className="q-price">
      <span>{price}</span>
      {suffix && <small>{suffix}</small>}
      {previousPrice && <del>{previousPrice}</del>}
    </p>
  );
}

export function PurchaseButton({ children = "Ajouter au panier" }: { children?: string }) {
  const [added, setAdded] = useState(false);
  return (
    <Button className="q-purchase-button" onClick={() => setAdded(true)}>
      {added ? (
        <>
          <Check aria-hidden="true" /> Ajouté au panier
        </>
      ) : (
        <>
          {children}
          <ArrowRight aria-hidden="true" />
        </>
      )}
    </Button>
  );
}

export function MagazinePreviewButton() {
  return (
    <Button variant="secondary">
      <BookOpen aria-hidden="true" /> Feuilleter un extrait
    </Button>
  );
}

export function SubscriptionOption({
  title,
  price,
  detail,
  selected: selectedProp = false,
}: {
  title: string;
  price: string;
  detail: string;
  selected?: boolean;
}) {
  const [selected, setSelected] = useState(selectedProp);
  return (
    <button
      type="button"
      className={cn("q-subscription", selected && "is-selected")}
      aria-pressed={selected}
      onClick={() => setSelected(!selected)}
    >
      <span>{title}</span>
      <strong>{price}</strong>
      <small>{detail}</small>
      <i aria-hidden="true">{selected && <Check />}</i>
    </button>
  );
}
