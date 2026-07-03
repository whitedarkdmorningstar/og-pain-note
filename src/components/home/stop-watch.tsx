import { useRouter } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../ui/button";
import Card from "../ui/card";
import IconButton from "../ui/icon-button";
import Text from "../ui/text";

interface StopwatchProps {
  text: string;
  running?: boolean;
  handleRunning: () => void;
  handleReset: () => void;
  handlePainStarts: () => void;
  handlePainEnds: () => void;
  painStarted: boolean;
  maxTime: number;
}

export default function Stopwatch({
  text,
  handleRunning,
  handleReset,
  handlePainStarts,
  handlePainEnds,
  running,
  painStarted,
  maxTime,
}: StopwatchProps) {
  const router = useRouter();

  const toSettings = useCallback(() => router.push("/settings"), [router]);

  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.text}>{text}</Text>
        <IconButton name={"cog"} onPress={toSettings} style={styles.btn} />
        {/**Action Buttons */}
        <View style={styles.row}>
          <Button onPress={handleRunning}>{running ? "Pause" : "Start"}</Button>
          <Button onPress={handleReset}>Reset</Button>
        </View>
      </Card>
      <Text mode={"title"}>Pain Note (max - {maxTime / 60000} min)</Text>
      <View style={styles.row}>
        <Button
          variant={"error"}
          disabled={painStarted}
          onPress={handlePainStarts}
        >
          Pain Starts
        </Button>
        <Button
          variant={"error"}
          disabled={!painStarted}
          onPress={handlePainEnds}
        >
          Pain Ends
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  text: {
    fontSize: 72,
  },
  container: {
    justifyContent: "center",
    gap: 16,
  },
  btn: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: 8,
  },
});
