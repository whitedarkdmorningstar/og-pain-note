import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import IconButton from "./icon-button";
import Text from "./text";

export interface NumberInputProps {
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  value: number;
  iconSize?: number;
  onValueChange: (value: number) => void;
  nativeNumbers?: string[];
  showButtons?: boolean;
  textInputStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
}

export default function NumberInput({
  nativeNumbers,
  value,
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  onValueChange,
  showButtons = true,
  textInputStyle,
  style,
  buttonStyle,
}: NumberInputProps) {
  const [internalValue, setInternalValue] = useState<number>(value || 0);

  useEffect(() => {
    if (internalValue !== value) onValueChange?.(internalValue);
  }, [internalValue, onValueChange]);

  const label = useMemo(
    () => Math.round(internalValue / (1000 * 60)) + " min",
    [internalValue, nativeNumbers],
  );

  const intervalRef = useRef<number | null>(null);

  const updateValue = useCallback(
    (delta: number) => {
      setInternalValue((prev) =>
        Math.min(Math.max(prev + delta, minimumValue), maximumValue),
      );
    },
    [minimumValue, maximumValue],
  );

  const startContinuousUpdate = useCallback(
    (delta: number) => {
      intervalRef.current = setInterval(() => {
        setInternalValue((prev) =>
          Math.min(Math.max(prev + delta, minimumValue), maximumValue),
        );
      }, 100);
    },
    [setInternalValue, minimumValue, maximumValue],
  );

  const stopContinuousUpdate = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const onChangeText = useCallback((value: string) => {
    let newValue = Number(value);

    if (!isNaN(newValue)) {
      newValue = Math.min(Math.max(newValue, minimumValue), maximumValue);
      onValueChange?.(newValue);
    } else {
      onValueChange?.(0);
    }
  }, []);

  useEffect(() => {
    return stopContinuousUpdate;
  }, [stopContinuousUpdate]);

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        },
        style,
      ]}
    >
      {showButtons && (
        <IconButton
          name="minus"
          delayLongPress={300}
          onPressIn={() => updateValue(-step)}
          onLongPress={() => startContinuousUpdate(-step)}
          onPressOut={stopContinuousUpdate}
          style={buttonStyle}
        />
      )}
      <Text
        style={[{ textAlign: "center", marginHorizontal: 4 }, textInputStyle]}
      >
        {label}
      </Text>

      {showButtons && (
        <IconButton
          name={"plus"}
          delayLongPress={300}
          onPressIn={() => updateValue(step)}
          onLongPress={() => startContinuousUpdate(step)}
          onPressOut={stopContinuousUpdate}
          style={buttonStyle}
        />
      )}
    </View>
  );
}
