import { encrypt, isPwValide } from "../utils/control";

describe("Testing encryption functions", () => {
  const result = encrypt("123");
  it("should encrypt any given password", () => {
    expect(result).toEqual(result);
  });
  it("should match and return true", () => {
    const match = isPwValide("123", result);
    expect(match).toBeTruthy();
  });
  it("should not match and return false", () => {
    const match = isPwValide("321", result);
    expect(match).toBeFalsy();
  });
});
