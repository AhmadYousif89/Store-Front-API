"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../../api/orders/orders");
describe("Order Model functions: \n", () => {
    it("should be a method to get all orders", () => {
        expect(orders_1.orderModel.index).toBeDefined();
    });
    it("should be a method to get an order by id", () => {
        expect(orders_1.orderModel.show).toBeDefined();
    });
    it("should be a method to create orders", () => {
        expect(orders_1.orderModel.create).toBeDefined();
    });
    it("should be method an update orders", () => {
        expect(orders_1.orderModel.update).toBeDefined();
    });
    it("should be a method to delete orders", () => {
        expect(orders_1.orderModel.delete).toBeDefined();
    });
});
