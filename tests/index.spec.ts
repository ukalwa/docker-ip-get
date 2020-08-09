import fs from "fs";
import { isInDocker } from "../src";

describe("isInDocker", () => {
  const mock = jest.spyOn(fs, "readFileSync");
  beforeEach(() => {
    mock.mockReset();
  });
  test("returns true if inside docker", () => {
    mock.mockReturnValueOnce(
      "2:cpu:/docker/7e5b8976101572b85e0aeea155d3350ce2f3fbaf068bd894c094977a004002ac\n" +
        "1:cpuset:/docker/7e5b8976101572b85e0aeea155d3350ce2f3fbaf068bd894c094977a004002ac\n"
    );
    expect(isInDocker()).toBe(true);
    expect(mock).toBeCalledTimes(1);
  });

  test("returns false if inside docker", () => {
    mock.mockReturnValueOnce("2:cpu:/\n" + "1:cpuset:/\n");
    expect(isInDocker()).toBe(false);
    expect(mock).toBeCalledTimes(1);
  });
});
