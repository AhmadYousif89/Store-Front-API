"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("./../../api/__services__/dashboard");
describe("Testing user Model functions: \n", () => {
    it("should be a method to get all products related to a user", () => {
        expect(dashboard_1.dashBoard.getUserProducts).toBeDefined();
    });
    it("should be a method to get all products related to a user for specific orders", () => {
        expect(dashboard_1.dashBoard.getUserProductsByOid).toBeDefined();
    });
    it("should be a method to get all products based on popularity, list is limited by 5 items", () => {
        expect(dashboard_1.dashBoard.getProductByPopularity).toBeDefined();
    });
    it("should be a method to get all user's purachases that he/she made, list is sorted by most recent date", () => {
        expect(dashboard_1.dashBoard.getUserMostPurchases).toBeDefined();
    });
});
