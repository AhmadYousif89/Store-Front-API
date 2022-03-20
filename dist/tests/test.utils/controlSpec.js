"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const control_1 = require("../../utils/control");
describe("Encryption functions", () => {
    it("should be a method for encrypting user passwords", () => {
        expect(control_1.encrypt).toBeDefined();
    });
    it("should be a method for comparing between user password and hashed password", () => {
        expect(control_1.isPwValide).toBeDefined();
    });
    it("should be a method for making custom error syntax", () => {
        expect(control_1.customErr).toBeDefined();
    });
    const test = (0, control_1.encrypt)("123");
    it("should encrypt any given password", () => {
        expect(test).not.toEqual("123");
    });
    it("should match and return true", () => {
        const match = (0, control_1.isPwValide)("123", test);
        expect(match).toBeTruthy();
    });
    it("should not match and return false", () => {
        const match = (0, control_1.isPwValide)("321", test);
        expect(match).toBeFalsy();
    });
});
