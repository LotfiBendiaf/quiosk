"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "./cart-provider";

export function CartLink({ className = "" }: { className?: string }) {
  const { count } = useCart();
  return (
    <Link
      href="/panier"
      className={`q-cart-link ${className}`}
      aria-label={`Panier, ${count} article${count > 1 ? "s" : ""}`}
    >
      <ShoppingBag size={20} aria-hidden="true" />
      {count > 0 && <span className="q-cart-link__count">{count}</span>}
    </Link>
  );
}
