import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { USDC_DECIMALS } from "@/constants/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatterBigInt(num: bigint): string {
  const formatted = (Number(num) / 1_000_000_000_000_000_000).toFixed(18).replace('.', ',');
  return formatted;
}

export function formatAddress(inputString: string): string {
  if (inputString.length <= 8) return inputString;

  const firstPart = inputString.slice(0, 4);
  const lastPart = inputString.slice(-4);
  return `${firstPart}…${lastPart}`;
}

export function convertBigIntToNumber(bigIntValue: bigint): number {
  return Number(bigIntValue) / 1_000_000_000_000_000_000;
}

export function convertNumberToBigInt(num: number): bigint {
  return BigInt(num * 1_000_000_000_000_000_000);
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

export const toUSDCAmount = (amount: string): bigint => {
  const cleanAmount = amount.replace(/,/g, '');
  const [whole, fraction = ""] = cleanAmount.split('.');
  const paddedFraction = fraction.padEnd(USDC_DECIMALS, '0').slice(0, USDC_DECIMALS);
  return BigInt(whole + paddedFraction);
};

export const formatterBigIntDecimal18 = (value: bigint): string => {
  const scaledValue = value / BigInt(1_000_000_000_000_000_000);
  const integerPart = scaledValue.toString();
  return `${integerPart}`;
}

export function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const arr = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
}