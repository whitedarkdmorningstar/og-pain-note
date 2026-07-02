import { z } from "zod";

export const themeModeSchema = z.enum(["light", "dark", "system"]);

export const languageSchema = z.enum(["english", "myanmar"]);

export const settingsSchema = z.object({
  mode: themeModeSchema,
  language: languageSchema,
  maxTime: z.number(),
});

// Types
export type ThemeMode = z.infer<typeof themeModeSchema>;
export type Language = z.infer<typeof languageSchema>;
export type Settings = z.infer<typeof settingsSchema>;
