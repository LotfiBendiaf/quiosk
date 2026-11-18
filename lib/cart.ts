import { magazines } from "@/lib/magazines";
import { demoSubscriptionPrices } from "@/lib/pricing";
import { MARKETS, type MarketId } from "@/lib/markets";

export type CartItem = { key: string; kind: "issue" | "subscription"; slug?: string; quantity: 1 };
export const CART_STORAGE_KEY = "quiosk_cart_v1";
export const SUBSCRIPTION_KEY = "subscription:quiosk";

export function parseCart(value: string | null): CartItem[] {
  if (!value) return [];
  try {
    const input: unknown = JSON.parse(value);
    if (!Array.isArray(input)) return [];
    const unique = new Map<string, CartItem>();
    for (const item of input) {
      if (!item || typeof item !== "object") continue;
      const entry = item as Record<string, unknown>;
      if (entry.kind === "subscription") {
        unique.set(SUBSCRIPTION_KEY, { key: SUBSCRIPTION_KEY, kind: "subscription", quantity: 1 });
      } else if (entry.kind === "issue" && typeof entry.slug === "string" && magazines.some(m => m.slug === entry.slug)) {
        const key = `issue:${entry.slug}`;
        unique.set(key, { key, kind: "issue", slug: entry.slug, quantity: 1 });
      }
    }
    return [...unique.values()].slice(0, 40);
  } catch {
    return [];
  }
}
export function itemPrice(item: CartItem, market: MarketId): number | null {
  const currency = MARKETS[market].currency;
  if (item.kind === "subscription") return demoSubscriptionPrices[currency] ?? null;
  const issue = magazines.find(m => m.slug === item.slug);
  return issue?.prices?.[currency] ?? null;
}
export function cartTotal(items: CartItem[], market: MarketId): number | null {
  const prices = items.map(item => itemPrice(item, market));
  return prices.some(v => v === null) ? null : prices.reduce<number>((total, price) => total + (price ?? 0), 0);
}
