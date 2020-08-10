import fs from "fs";
import * as dockerIpTools from "../src";

describe("isInDocker", () => {
  const mock = jest.spyOn(fs, "readFileSync");
  beforeEach(() => {
    mock.mockReset();
  });
  afterAll(() => {
    mock.mockRestore();
  });
  test("returns true if inside docker", () => {
    mock.mockReturnValueOnce(
      "2:cpu:/docker/7e5b8976101572b85e0aeea155d3350ce2f3fbaf068bd894c094977a004002ac\n" +
        "1:cpuset:/docker/7e5b8976101572b85e0aeea155d3350ce2f3fbaf068bd894c094977a004002ac\n"
    );
    expect(dockerIpTools.isInDocker()).toBe(true);
    expect(mock).toBeCalledTimes(1);
  });

  test("returns false if inside docker", () => {
    mock.mockReturnValueOnce("2:cpu:/\n" + "1:cpuset:/\n");
    expect(dockerIpTools.isInDocker()).toBe(false);
    expect(mock).toBeCalledTimes(1);
  });
});

test("validates if the module is called from inside container or not", () => {
  const mock = jest
    .spyOn(dockerIpTools, "isInDocker")
    .mockReturnValueOnce(true)
    .mockReturnValueOnce(false);
  expect(dockerIpTools.validateIsInDocker()).toBe(undefined);
  expect(() => dockerIpTools.validateIsInDocker()).toThrow();
  expect(mock).toBeCalledTimes(2);

  mock.mockRestore();
});

test("methods throw errors if they are executed outside container", async () => {
  const mock = jest.spyOn(dockerIpTools, "isInDocker").mockReturnValue(false);
  await expect(() => dockerIpTools.getContainerIp()).rejects.toEqual(
    new Error("Attempted to call the method from outside docker container!")
  );
  await expect(() => dockerIpTools.getGatewayIp()).rejects.toEqual(
    new Error("Attempted to call the method from outside docker container!")
  );
  await expect(() => dockerIpTools.getHostIp()).rejects.toEqual(
    new Error("Attempted to call the method from outside docker container!")
  );

  mock.mockRestore();
});

test("methods return IP addresses", async () => {
  const mock = jest.spyOn(dockerIpTools, "isInDocker").mockReturnValue(true);
  const mock2 = jest
    .spyOn(dockerIpTools, "exec")
    .mockResolvedValueOnce({ stdout: "test-ip", stderr: "error" });
  const lookupSpy = jest
    .spyOn(dockerIpTools, "lookup")
    .mockResolvedValueOnce({ address: "1.2.3.4", family: 4 })
    .mockResolvedValueOnce({ address: "5.6.7.8", family: 4 });
  await expect(dockerIpTools.getContainerIp()).resolves.toEqual("test-ip");
  await expect(dockerIpTools.getGatewayIp()).resolves.toEqual("1.2.3.4");
  await expect(dockerIpTools.getHostIp()).resolves.toEqual("5.6.7.8");

  mock.mockRestore();
  mock2.mockRestore();
  lookupSpy.mockRestore();
});
