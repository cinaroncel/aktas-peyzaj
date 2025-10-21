import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(priceCents: number, currency: string = "TRY"): string {
  const price = priceCents / 100;
  const currencySymbol = currency === "TRY" ? "₺" : currency;
  return `${currencySymbol}${price.toFixed(2)}`;
}
