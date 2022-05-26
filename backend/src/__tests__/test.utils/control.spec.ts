import { customErr, encrypt, isPasswordValide } from "../../helpers/control";

describe("Encryption functions", () => {
  it("should be a method for encrypting user passwords", () => {
    expect(encrypt).toBeDefined();
  });

  it("should be a method for comparing between user password and hashed password", () => {
    expect(isPasswordValide).toBeDefined();
  });

  it("should be a method for making custom error syntax", () => {
    expect(customErr).toBeDefined();
  });

  const test = encrypt("123");
  it("should encrypt any given password", () => {
    expect(test).not.toEqual("123");
  });

  it("should match and return true", () => {
    const match = isPasswordValide("123", test);
    expect(match).toBeTruthy();
  });

  it("should not match and return false", () => {
    const match = isPasswordValide("321", test);
    expect(match).toBeFalsy();
  });
});
