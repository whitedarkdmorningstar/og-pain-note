import PainNotes, { PainNote } from "@/components/home/pain-notes";
import Stopwatch from "@/components/home/stop-watch";
import { useSettings } from "@/context/settings.context";
import { msToTime } from "@/utils/msToTime";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View } from "react-native";

export default function Home() {
  const { maxTime } = useSettings();
  const [painNotes, setPainNotes] = useState<PainNote[]>([]);
  const [painStarted, setPainStarted] = useState<boolean>(false);
  const [elapsed, setElapsed] = useState(0); // ms
  const [running, setRunning] = useState<boolean>(false);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset the stopwatch and pain notes when maxTime changes
    setElapsed(0);
    setPainNotes([]);
    setRunning(false);
    setPainStarted(false);
  }, [maxTime]);

  useEffect(() => {
    let interval: any | null = null;

    if (running) {
      startRef.current = Date.now() - elapsed;
      interval = setInterval(() => {
        const newElapsed = Date.now() - (startRef.current ?? Date.now());

        if (newElapsed >= maxTime) {
          setElapsed(maxTime); // clamp at 10 minutes
          setRunning(false); // stop the stopwatch
          clearInterval(interval); // clear the interval
        } else {
          setElapsed(newElapsed);
        }
      }, 10); // update every 10ms
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [running]);

  const handleRunning = useCallback(() => setRunning((prev) => !prev), []);

  const handleReset = useCallback(() => {
    setElapsed(0);
    setPainNotes([]);
    setRunning(false);
    setPainStarted(false);
  }, []);

  const handlePainStarts = useCallback(() => {
    if (elapsed === 0 || painStarted) return;

    setPainNotes((prev) => [...prev, { start: elapsed }]);
    // Pain started
    setPainStarted(true);
  }, [elapsed]);

  const handlePainEnds = useCallback(() => {
    if (elapsed === 0 || !painStarted) return;

    setPainNotes((prev) =>
      prev.map((e, i) => (i === prev.length - 1 ? { ...e, end: elapsed } : e)),
    );
    // Pain ended
    setPainStarted(false);
  }, [elapsed]);

  const stopwatchTime = useMemo(() => msToTime(elapsed, true), [elapsed]);

  return (
    <View style={{ flex: 1, paddingTop: 48, padding: 16, gap: 16 }}>
      <Stopwatch
        text={stopwatchTime!}
        handleRunning={handleRunning}
        handleReset={handleReset}
        handlePainStarts={handlePainStarts}
        handlePainEnds={handlePainEnds}
        running={running}
        painStarted={painStarted}
        maxTime={maxTime}
      />
      <PainNotes painNotes={painNotes} />
    </View>
  );
}
