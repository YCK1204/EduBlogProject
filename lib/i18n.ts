import koStrings from "@/data/i18n/ko.json";
import enStrings from "@/data/i18n/en.json";

export type Lang = "ko" | "en";

export const STRINGS = {
  ko: koStrings,
  en: enStrings,
} as const;

export type Strings = typeof koStrings;
