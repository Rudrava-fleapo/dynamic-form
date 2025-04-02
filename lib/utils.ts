import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function url(path: string) {
  const generateURL = new URL(path, process.env.API_BASE_URL);
  return generateURL.toString();
}
