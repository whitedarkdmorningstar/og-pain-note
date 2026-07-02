import { StyleSheet, View } from "react-native";
import Button from "../ui/button";
import Card from "../ui/card";
import Text from "../ui/text";

interface StopwatchProps {
  text: string;
  running?: boolean;
  handleRunning: () => void;
  handleReset: () => void;
  handlePainStarts: () => void;
  handlePainEnds: () => void;
  painStarted: boolean;
}

export default function Stopwatch({
  text,
  handleRunning,
  handleReset,
  handlePainStarts,
  handlePainEnds,
  running,
  painStarted,
}: StopwatchProps) {
  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.text}>{text}</Text>
        {/**Action Buttons */}
        <View style={styles.row}>
          <Button onPress={handleRunning}>{running ? "Pause" : "Start"}</Button>
          <Button onPress={handleReset}>Reset</Button>
        </View>
      </Card>
      <Text mode={"title"}>Pain Note</Text>
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
    gap: 16,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 72,
    width: "100%",
  },
  container: {
    justifyContent: "center",
    gap: 16,
  },
});
