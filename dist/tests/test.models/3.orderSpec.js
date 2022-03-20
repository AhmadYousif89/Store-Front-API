"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../../api/users/users");
const orders_1 = require("../../api/orders/orders");
const appSpec_1 = require("../test.app.routes/appSpec");
const database_1 = __importDefault(require("../../database"));
let userId;
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
    describe("Testing SQL functions: \n ", () => {
        it("should create a user and extract its id", async () => {
            await users_1.userModel.create(appSpec_1.schema);
            const user = await users_1.userModel.index();
            userId = user[0].u_id;
            console.log("user id extracted: ", userId);
        });
        it(`should create new order`, async () => {
            const order = await orders_1.orderModel.create({
                order_status: appSpec_1.schema.order_status,
                u_id: userId,
            });
            expect(order).toEqual({
                msg: "Order created successfully",
                data: {
                    order_id: appSpec_1.schema.order_id,
                    order_status: appSpec_1.schema.order_status,
                    user_id: userId,
                },
            });
        });
        it(`should get all orders`, async () => {
            const order = await orders_1.orderModel.index();
            expect(order).toEqual([
                {
                    order_id: appSpec_1.schema.order_id,
                    order_status: appSpec_1.schema.order_status,
                    user_id: userId,
                },
            ]);
        });
        it(`should get one order by id`, async () => {
            const order = await orders_1.orderModel.show(appSpec_1.schema.order_id);
            expect(order).toEqual({
                msg: "Order generated successfully",
                data: {
                    order_id: appSpec_1.schema.order_id,
                    order_status: appSpec_1.schema.order_status,
                    user_id: userId,
                },
            });
        });
        it(`should update the status of one order by id`, async () => {
            const order = await orders_1.orderModel.update(appSpec_1.schema.order_id, "active");
            expect(order).toEqual({
                msg: "Order updated successfully",
                data: {
                    order_id: appSpec_1.schema.order_id,
                    order_status: "active",
                    user_id: userId,
                },
            });
        });
        it(`should delete one order by id`, async () => {
            const order = await orders_1.orderModel.delete(appSpec_1.schema.order_id);
            expect(order).toEqual({
                msg: "Order deleted successfully",
                data: {
                    order_id: appSpec_1.schema.order_id,
                    order_status: "active",
                    user_id: userId,
                },
            });
        });
        afterAll(async () => {
            const conct = await database_1.default.connect();
            await conct.query("DELETE FROM users");
            await conct.query("ALTER SEQUENCE orders_order_id_seq RESTART WITH 1");
            console.log("seq altered");
            conct.release();
        });
    });
});
