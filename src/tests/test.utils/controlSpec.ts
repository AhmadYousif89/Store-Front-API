import { customErr, encrypt, isPwValide } from "../../utils/control";

fdescribe("Testing encryption functions", () => {
  describe("check methods exist", () => {
    it("should be a method for encrypting user passwords", () => {
      expect(encrypt).toBeDefined();
    });

    it("should be a method for comparing between user password and hashed password", () => {
      expect(isPwValide).toBeDefined();
    });

    it("should be a method for making custom error syntax", () => {
      expect(customErr).toBeDefined();
    });
  });
  const result = encrypt("123");
  it("should encrypt any given password", () => {
    expect(result).not.toEqual("123");
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
