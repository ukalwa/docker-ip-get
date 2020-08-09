import { add, subtract } from "../src";

test("add fn should add two numbers", () => {
  expect(add(-1, -5)).toEqual(-6);
  expect(add(5, 4)).toEqual(9);
});

test("subtract fn should subtract two numbers", () => {
  expect(subtract(-1, -5)).toEqual(4);
  expect(subtract(5, 4)).toEqual(1);
});
