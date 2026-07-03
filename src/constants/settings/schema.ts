export type ThemeMode = "light" | "dark" | "system";

export type Language = "english" | "myanmar";

export type Settings = {
  mode: ThemeMode;
  language: Language;
  maxTime: number;
};
