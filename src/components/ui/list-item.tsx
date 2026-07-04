import useTheme from "@/hooks/use-theme";
import React, { useMemo } from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";

export interface ListItemProps extends TouchableOpacityProps {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  right?: React.ReactNode;
}

export default function ListItem({
  title,
  titleStyle,
  style,
  right,
  ...props
}: ListItemProps) {
  const { colors, spacing, borderRadius, borderWidth, fontSize, iconSize } =
    useTheme();

  const containerStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
      padding: spacing.lg,
      borderRadius,
      backgroundColor: colors.card,
      borderWidth,
      borderColor: colors.border,
    }),
    [spacing, borderRadius, colors, borderWidth],
  );

  return (
    <TouchableOpacity activeOpacity={0.8} {...props}>
      <View style={[containerStyle, style]}>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              { color: colors.text, fontSize: fontSize.default },
              titleStyle,
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
        </View>
        {right}
      </View>
    </TouchableOpacity>
  );
}
