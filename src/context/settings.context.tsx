import { DEFAULT_SETTINGS } from "@/constants/settings";
import { Settings } from "@/constants/settings/schema";
import useStoredSettings from "@/hooks/use-stored-settings";
import { toast } from "@/utils/toast";
import React, { useCallback } from "react";

export interface SettingsContext extends Settings {
  changeThemeMode: (mode: Settings["mode"]) => void;
  changeSettings: (
    key: keyof Settings,
    value: Settings[keyof Settings],
  ) => void;
  changeMaxTime: (time: Settings["maxTime"]) => void;
}

export const settingsContext = React.createContext<SettingsContext | undefined>(
  undefined,
);

// Settings provider
export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = React.useState<Settings>(DEFAULT_SETTINGS);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  useStoredSettings(settings, setSettings, isLoading, setLoading);

  // Settings change handlers
  const changeSettings = useCallback(
    (key: keyof Settings, value: Settings[keyof Settings]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const changeThemeMode = useCallback(
    (mode: Settings["mode"]) => {
      if (settings.mode === mode) return;

      setSettings((prev) => ({ ...prev, mode }));
    },
    [settings.mode],
  );

  const changeMaxTime = useCallback(
    (time: Settings["maxTime"]) => {
      if (time === 60 * 60 * 1000) {
        toast("Maximum duration is 60 minutes");
      }
      if (time === 1 * 60 * 1000) {
        toast("Minimum duration is 1 minute");
      }
      changeSettings("maxTime", time);
    },
    [changeSettings],
  );

  const value = {
    ...settings,
    changeThemeMode,
    changeSettings,
    changeMaxTime,
  };

  if (isLoading) return null;

  return (
    <settingsContext.Provider value={value}>
      {children}
    </settingsContext.Provider>
  );
}

// Settings hook
export function useSettings() {
  const context = React.useContext(settingsContext);

  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }

  return context;
}
