export function msToTime(ms?: number, showMilliseconds = false) {
  if (ms === 0) return showMilliseconds ? `00:00:00` : `00:00`;

  if (!ms) return null;

  // Format MM:SS:MS (two digits each)
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10); // two digits

  return showMilliseconds
    ? `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`
    : `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
}
