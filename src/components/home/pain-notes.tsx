import useTheme from "@/hooks/use-theme";
import { msToSecond } from "@/utils/msToSecond";
import { msToTime } from "@/utils/msToTime";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { ScrollView, StyleSheet, TextStyle, View } from "react-native";
import Text from "../ui/text";

export type PainNote = {
  start: number;
  end?: number;
};

interface PainNotesProps {
  painNotes: PainNote[];
}

export default function PainNotes({ painNotes }: PainNotesProps) {
  const { spacing, borderWidth, borderRadius, colors } = useTheme();
  const scrollRef = useRef<ScrollView>(null);

  const cellStyle: TextStyle = useMemo(
    () => ({ padding: spacing.md, flex: 1, textAlign: "right" }),
    [spacing],
  );

  const renderItem = useCallback(
    (pain: PainNote, index: number) => (
      <View
        key={pain.start.toString()}
        style={[
          styles.row,
          { borderBottomWidth: borderWidth, borderColor: colors.border },
        ]}
      >
        <Text style={[cellStyle, { maxWidth: 50 }]}>{index + 1}</Text>
        <Text style={cellStyle}>{msToTime(pain.start)}</Text>
        <Text style={cellStyle}>{msToTime(pain.end) || "-"}</Text>
        <Text style={cellStyle}>
          {pain.end
            ? msToSecond(pain.end)! - msToSecond(pain.start)! + "s"
            : "-"}
        </Text>
      </View>
    ),
    [borderWidth, colors.border, cellStyle],
  );

  const summary = useMemo(() => {
    const count = painNotes.length;
    const maxDuration = Math.max(
      ...painNotes.map(({ start, end }) =>
        end ? msToSecond(end)! - msToSecond(start)! : 0,
      ),
    );

    if (maxDuration === 0 || count === 0) return null;

    return `${count} in 10 minutes with ${maxDuration} seconds duration`;
  }, [painNotes]);

  // Scroll to end whenever painNotes length changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true });
    }
  }, [painNotes.length]);

  return (
    <View
      style={{
        padding: spacing.md,
        borderWidth,
        borderColor: colors.border,
        borderRadius,
        flex: 1,
        marginBottom: spacing.md,
      }}
    >
      <View
        style={[
          styles.row,
          { borderBottomWidth: borderWidth, borderColor: colors.border },
        ]}
      >
        <Text style={[cellStyle, { maxWidth: 50 }]}>No</Text>
        <Text style={cellStyle}>Start</Text>
        <Text style={cellStyle}>End</Text>
        <Text style={cellStyle}>Duration</Text>
      </View>

      <View style={{ flex: 1 }}>
        <ScrollView ref={scrollRef} showsVerticalScrollIndicator={true}>
          {painNotes.map(renderItem)}
        </ScrollView>
      </View>

      {summary !== null && (
        <Text
          style={{ padding: spacing.md, fontWeight: "bold" }}
          mode={"subtitle"}
        >
          {summary}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
});
