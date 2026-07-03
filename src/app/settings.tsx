import ThemeMode from "@/components/settings/theme-mode";
import UserInterface from "@/components/settings/user-interface";
import { View } from "react-native";

export default function Settings() {
  return (
    <View style={{ padding: 16, gap: 16 }}>
      <ThemeMode />
      <UserInterface />
    </View>
  );
}
