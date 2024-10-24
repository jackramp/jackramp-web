import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAddress(inputString: string): string {
  if (inputString.length <= 8) return inputString;

  const firstPart = inputString.slice(0, 4); 
  const lastPart = inputString.slice(-4); 
  return `${firstPart}…${lastPart}`;
}

export function convertBigIntToNumber(bigIntValue: bigint): number {
  return Number(bigIntValue) / 1_000_000;
}

export function convertNumberToBigInt(num: number): bigint {
  return BigInt(num * 1_000_000);
}

export function convertTimestampToDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
  };

  return date.toLocaleString('en-US', options);
}