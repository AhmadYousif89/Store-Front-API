"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orderedProducts_1 = require("./../../api/orderedProducts/orderedProducts");
describe("OrderedProducts Model functions: \n", () => {
    it("should be a method to get all data", () => {
        expect(orderedProducts_1.OPT.index).toBeDefined();
    });
    it("should be a method to get one row by id", () => {
        expect(orderedProducts_1.OPT.show).toBeDefined();
    });
    it("should be a method to add products to existing orders", () => {
        expect(orderedProducts_1.OPT.addProducts).toBeDefined();
    });
    it("should be method an update for product quantity", () => {
        expect(orderedProducts_1.OPT.update).toBeDefined();
    });
    it("should be a method to delete a row by id", () => {
        expect(orderedProducts_1.OPT.delete).toBeDefined();
    });
});
