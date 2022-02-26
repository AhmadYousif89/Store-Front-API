"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const control_1 = require("../utils/control");
describe("Testing encryption functions", () => {
    const result = (0, control_1.encrypt)("123");
    it("should encrypt any given password", () => {
        expect(result).toEqual(result);
    });
    it("should match and return true", () => {
        const match = (0, control_1.isPwValide)("123", result);
        expect(match).toBeTruthy();
    });
    it("should not match and return false", () => {
        const match = (0, control_1.isPwValide)("321", result);
        expect(match).toBeFalsy();
    });
});
