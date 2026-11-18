/** Quiosk's three supported storefront markets. All editorial content stays in French. */
export const MARKETS = {
  algerie: { slug: "algerie", name: "Algérie", currency: "DZD", locale: "fr-DZ" },
  europe: { slug: "europe", name: "Europe", currency: "EUR", locale: "fr-FR" },
  amerique: { slug: "amerique", name: "Amérique", currency: "USD", locale: "fr-FR" },
} as const;
export type MarketId = keyof typeof MARKETS;
export type MarketCurrency = (typeof MARKETS)[MarketId]["currency"];
export type MarketPrices = Partial<Record<MarketCurrency, number>>;
export const DEFAULT_MARKET: MarketId = "algerie";
export const MARKET_COOKIE = "quiosk_market";
export const isMarketId = (value: unknown): value is MarketId =>
  typeof value === "string" && Object.prototype.hasOwnProperty.call(MARKETS, value);
export function formatMarketPrice(amount: number, market: MarketId): string {
  const { currency, locale } = MARKETS[market];
  return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 2 }).format(amount);
}
