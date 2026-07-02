import { SettingsProvider } from "@/context/settings.context";
import useThemeScheme from "@/hooks/use-theme-scheme";
import { Stack, ThemeProvider } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {
  return (
    <SettingsProvider>
      <App />
    </SettingsProvider>
  );
}

function App() {
  const { theme, statusBarStyle } = useThemeScheme();

  return (
    <KeyboardProvider
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <ThemeProvider value={theme}>
        <Stack
          screenOptions={{
            animation: "simple_push",
            animationDuration: 150,
            statusBarStyle,
            statusBarTranslucent: true,
          }}
          initialRouteName={"index"}
        >
          <Stack.Screen
            name={"index"}
            options={{ headerShown: false, title: "Home" }}
          />
        </Stack>
      </ThemeProvider>
    </KeyboardProvider>
  );
}
