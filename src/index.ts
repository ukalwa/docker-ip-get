import { readFileSync } from "fs";
import dns from "dns";
import { promisify } from "util";
import cp from "child_process";

export const lookup = promisify(dns.lookup);
export const exec = promisify(cp.exec);

// https://stackoverflow.com/a/37015387
export const isInDocker = (): boolean => {
  const file = readFileSync("/proc/self/cgroup", "utf-8");
  return file.indexOf("/docker") !== -1;
};

export function validateIsInDocker(): void {
  if (!isInDocker()) {
    throw new Error(
      "Attempted to call the method from outside docker container!"
    );
  }
}

export const lookupUpAddress = async (host: string): Promise<string> => {
  const result = await lookup(host, {
    family: 4,
    hints: dns.ADDRCONFIG | dns.V4MAPPED,
  });
  return result.address;
};

export async function getContainerIp(): Promise<string> {
  validateIsInDocker();
  return (await exec("hostname -i")).stdout.trim();
}

export async function getHostIp(): Promise<string> {
  validateIsInDocker();
  return await lookupUpAddress("host.docker.internal");
}

export async function getGatewayIp(): Promise<string> {
  validateIsInDocker();
  return await lookupUpAddress("gateway.docker.internal");
}
