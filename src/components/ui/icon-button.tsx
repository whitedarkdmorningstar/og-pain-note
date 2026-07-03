import useTheme from "@/hooks/use-theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  TouchableHighlight,
  TouchableHighlightProps,
} from "react-native";

export interface IconButtonProps extends TouchableHighlightProps {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
}

export default function IconButton({
  name,
  onPress = () => null,
  ...rest
}: IconButtonProps) {
  const { colors, spacing, iconSize } = useTheme();

  return (
    <TouchableHighlight
      underlayColor={colors.border}
      onPress={onPress}
      {...rest}
      style={[
        { padding: spacing.md + 2, backgroundColor: colors.backdrop },
        styles.btn,
        rest.style,
      ]}
    >
      <MaterialCommunityIcons
        name={name}
        size={iconSize}
        color={rest.disabled ? colors.disabled : colors.text}
      />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 100,
    elevation: 4,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
