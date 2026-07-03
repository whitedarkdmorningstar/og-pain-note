import { Language, Settings, ThemeMode } from "./schema";

export const THEME_MODE: { [key: string]: ThemeMode } = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
};

export const LANGUAGE: { [key: string]: Language } = {
  ENGLISH: "english",
  MYANAMR: "myanmar",
};

export const MAX_TIME = 10 * 60 * 1000;

export const DEFAULT_SETTINGS: Settings = {
  mode: THEME_MODE.SYSTEM,
  language: LANGUAGE.ENGLISH,
  maxTime: MAX_TIME,
};

export const ICON_SIZE = 24;
