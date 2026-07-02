export function msToSecond(ms?: number) {
  if (ms === 0) return 0;

  if (!ms) return null;

  return Math.floor(ms / 1000);
}
