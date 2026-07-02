import { TW_COLORS, Variant } from "@/constants/theme";
import useTheme from "@/hooks/use-theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  TouchableHighlight,
  TouchableHighlightProps,
  View,
  ViewStyle,
} from "react-native";

export interface ButtonProps extends TouchableHighlightProps {
  variant?: Variant;
  mode?: "outline" | "contained";
  loading?: boolean;
  reverse?: boolean;
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  size?: React.ComponentProps<typeof MaterialCommunityIcons>["size"];
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function Button({
  variant = "primary",
  mode = "contained",
  loading,
  reverse,
  style,
  ...props
}: ButtonProps) {
  const { colors, borderRadius, borderWidth, fontSize, spacing, iconSize } =
    useTheme();

  const btnStyle: ViewStyle = useMemo(
    () => ({
      backgroundColor:
        props.disabled || loading
          ? colors.disabled
          : mode === "contained"
            ? colors[variant]
            : "transparent",
      padding: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius,
      borderWidth: mode === "outline" ? borderWidth : 0,
      borderColor: mode === "outline" ? colors[variant] : colors.border,
      opacity: props.disabled || loading ? 0.4 : 1,
    }),
    [
      colors,
      variant,
      spacing,
      borderWidth,
      borderRadius,
      loading,
      props.disabled,
    ],
  );

  const continerStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: reverse ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.md,
      minWidth: 100,
    }),
    [reverse, spacing],
  );

  const textColor = useMemo(
    () => (mode === "outline" ? colors[variant] : TW_COLORS.gray["50"]),
    [mode, colors, variant],
  );

  const textStyle: TextStyle = useMemo(
    () => ({
      color: textColor,
      fontSize: fontSize.title,
    }),
    [textColor, fontSize],
  );

  return (
    <TouchableHighlight {...props} style={[btnStyle, props.containerStyle]}>
      <View style={[continerStyle, style]}>
        {loading ? (
          <ActivityIndicator animating color={textColor} />
        ) : (
          props.icon && (
            <MaterialCommunityIcons
              name={props.icon}
              size={props.size || iconSize}
              color={
                mode === "outline" ? colors[variant] : TW_COLORS.gray["50"]
              }
            />
          )
        )}
        <Text style={[textStyle, props.textStyle]}>{props.children}</Text>
      </View>
    </TouchableHighlight>
  );
}
