import { zeroleft } from "./zero-left";

export function secondsToMinutes(seconds: number): string {
  const min = zeroleft((seconds / 60) % 60);
  const sec = zeroleft((seconds % 60) % 60);
  return `${min}:${sec}`;
}
