"use server";

import { cookies } from "next/headers";
import { DEFAULT_MARKET, isMarketId, MARKET_COOKIE, type MarketId } from "@/lib/markets";

export async function selectQuioskMarket(value: string): Promise<MarketId> {
  if (!isMarketId(value)) return DEFAULT_MARKET;
  (await cookies()).set(MARKET_COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return value;
}
