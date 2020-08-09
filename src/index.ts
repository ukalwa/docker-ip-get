import { readFileSync } from "fs";

// https://stackoverflow.com/a/37015387
export function isInDocker(): boolean {
  const file = readFileSync("/proc/self/cgroup", "utf-8");
  return file.indexOf("/docker") !== -1;
}
