import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any }
  ? Omit<T, "children">
  : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
  ref?: U | null;
};

export function formatUnixTimestamp(timestamp) {
  // Convert seconds to milliseconds if needed
  if (timestamp.toString().length === 10) {
    timestamp *= 1000;
  }

  const date = new Date(timestamp);

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleString("en-GB", options);
}

export function secondsToDurationString(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const newSeconds = Math.floor(seconds) % 60;
  const milliseconds = (seconds * 1000) % 1000;
  const durationString = `${String(minutes).padStart(2, "0")}:${String(Math.round(newSeconds)).padStart(2, "0")}:${String(Math.round(milliseconds)).padStart(3, "0")}`;
  return durationString;
}
