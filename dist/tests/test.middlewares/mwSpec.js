"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const error_middleware_1 = __importDefault(require("../../middlewares/error.middleware"));
describe("Middleware functions: \n", () => {
    it("should be a method to handle authentication oprations", () => {
        expect(auth_middleware_1.default).toBeDefined();
    });
    it("should be a method to handle our application generated errors", () => {
        expect(error_middleware_1.default).toBeDefined();
    });
});
