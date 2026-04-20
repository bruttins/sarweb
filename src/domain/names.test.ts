import { describe, test, expect } from "vitest";
import { processNames } from "./names";

describe.each([
  {
    input: "pia, dom, rea, sabi",
    expected: ["pia", "dom", "rea", "sabi"],
    shouldPass: true,
  },
  {
    input: " pia, dom, rea, sabi ",
    expected: ["pia", "dom", "rea", "sabi"],
    shouldPass: true,
  },
  {
    input: "",
    expected: "no empty strings allowed",
    shouldPass: false,
  },
  {
    input: "a,b,c",
    expected: "minimum 4 names required",
    shouldPass: false,
  },
  {
    input: "a,b,c,d",
    expected: ["a", "b", "c", "d"],
    shouldPass: true,
  },
  {
    input: "a,b,c,d,e,f,g,h",
    expected: "maximum 7 names allowed",
    shouldPass: false,
  },
  {
    input: "a,b,c,d,e,f,g",
    expected: ["a", "b", "c", "d", "e", "f", "g"],
    shouldPass: true,
  },
  {
    input: "a,b,a",
    expected: "duplicate names not allowed",
    shouldPass: false,
  },
  {
    input: "Alice, , Bob",
    expected: "blank entries not allowed",
    shouldPass: false,
  },
])("processNames($input)", ({ input, expected, shouldPass }) => {
  test("processNames", () => {
    const actual = processNames(input);
    expect(actual.ok).toBe(shouldPass);
    if (actual.ok && shouldPass) {
      expect(actual.names).toEqual(expected);
    }
    if (!actual.ok && !shouldPass) {
      expect(actual.error).toBe(expected);
    }
  });
});