"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { CART_STORAGE_KEY, parseCart, SUBSCRIPTION_KEY, type CartItem } from "@/lib/cart";

const CHANGE = "quiosk:cart-change";
const EMPTY: CartItem[] = [];
let cachedRaw: string | null = null;
let cachedItems: CartItem[] = EMPTY;
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE, callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener(CHANGE, callback); };
}
function getSnapshot() {
  const raw = window.localStorage.getItem(CART_STORAGE_KEY);
  if (raw !== cachedRaw) { cachedRaw = raw; cachedItems = parseCart(raw); }
  return cachedItems;
}
function setItems(items: CartItem[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CHANGE));
}
type CartContextValue = {
  items: CartItem[];
  count: number;
  addIssue: (slug: string) => void;
  addSubscription: () => void;
  remove: (key: string) => void;
  clear: () => void;
  has: (key: string) => boolean;
};
const Context = createContext<CartContextValue | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
  const addIssue = (slug: string) => {
    const next = parseCart(JSON.stringify([...getSnapshot(), { key: `issue:${slug}`, kind: "issue", slug, quantity: 1 }]));
    setItems(next);
  };
  const addSubscription = () => {
    const next = parseCart(JSON.stringify([...getSnapshot().filter(i => i.kind !== "subscription"), { key: SUBSCRIPTION_KEY, kind: "subscription", quantity: 1 }]));
    setItems(next);
  };
  const remove = (key: string) => setItems(getSnapshot().filter(i => i.key !== key));
  const clear = () => setItems([]);
  const has = (key: string) => items.some(i => i.key === key);
  return <Context.Provider value={{ items, count: items.length, addIssue, addSubscription, remove, clear, has }}>{children}</Context.Provider>;
}
export function useCart() {
  const value = useContext(Context);
  if (!value) throw new Error("useCart must be used within CartProvider");
  return value;
}
