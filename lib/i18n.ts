import koStrings from "@/data/i18n/ko.json";
import enStrings from "@/data/i18n/en.json";
import jaStrings from "@/data/i18n/ja.json";

export type Lang = "ko" | "en" | "ja";

export const STRINGS = {
  ko: koStrings,
  en: enStrings,
  ja: jaStrings,
} as const;

export type Strings = typeof koStrings;
