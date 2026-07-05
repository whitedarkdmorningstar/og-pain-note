import useTheme from "@/hooks/use-theme";
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { Platform } from "react-native";

interface IconProps {
  name: string;
  color?: string;
  size?: number;
}

export default function Icon({ name, color, size }: IconProps) {
  const { iconSize, colors } = useTheme();

  return Platform.OS === "web" ? (
    <span
      className={"material-symbols-outlined"}
      style={{ fontSize: `${size || iconSize}px`, color: color || colors.text }}
    >
      {name === "cog"
        ? "settings"
        : name === "plus"
          ? "add"
          : name === "minus"
            ? "remove"
            : name === "radiobox-marked"
              ? "radio_button_checked"
              : name === "radiobox-blank"
                ? "radio_button_unchecked"
                : name === "arrow-left"
                  ? "arrow_back"
                  : name}
    </span>
  ) : (
    <MaterialDesignIcons
      name={name as any}
      color={color || colors.text}
      size={size || iconSize}
    />
  );
}
