import IconButton from "@/components/ui/icon-button";
import { SettingsProvider } from "@/context/settings.context";
import useThemeScheme from "@/hooks/use-theme-scheme";
import { Stack, ThemeProvider, useRouter } from "expo-router";

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
    <ThemeProvider value={theme}>
      <Stack
        screenOptions={{
          animation: "ios_from_right",
          statusBarStyle,
          statusBarTranslucent: true,
        }}
        initialRouteName={"index"}
      >
        <Stack.Screen
          name={"index"}
          options={{ headerShown: false, title: "Home" }}
        />
        <Stack.Screen
          name={"settings"}
          options={({ navigation }) => ({
            headerBackVisible: false,
            headerLeft: () => {
              const router = useRouter();

              return (
                <IconButton
                  style={{ marginStart: 16, backgroundColor: "transparent" }}
                  name={"arrow-left"}
                  onPress={() =>
                    router.canGoBack() ? router.back() : router.push("/")
                  }
                />
              );
            },
            title: "Settings",
          })}
        />
      </Stack>
    </ThemeProvider>
  );
}
