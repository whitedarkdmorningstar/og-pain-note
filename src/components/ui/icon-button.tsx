import useTheme from "@/hooks/use-theme";
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import React from "react";
import {
  StyleSheet,
  TouchableHighlight,
  TouchableHighlightProps,
} from "react-native";

export interface IconButtonProps extends TouchableHighlightProps {
  name: React.ComponentProps<typeof MaterialDesignIcons>["name"];
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
      style={[{ backgroundColor: colors.backdrop }, styles.btn, rest.style]}
    >
      <MaterialDesignIcons
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
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
});
