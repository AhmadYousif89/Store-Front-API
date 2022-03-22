"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appSpec_1 = require("../test.app.routes/appSpec");
const products_1 = require("../../api/products/products");
const orderedProducts_1 = require("../../api/orderedProducts/orderedProducts");
const orders_1 = require("../../api/orders/orders");
const users_1 = require("../../api/users/users");
const database_1 = __importDefault(require("../../database"));
let pId;
let userId;
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
    describe("Testing op SQL functions: \n ", () => {
        it("should create user and a product and extract their ids", async () => {
            await users_1.userModel.create(appSpec_1.schema);
            const user = await users_1.userModel.index();
            userId = user[0].u_id;
            console.log("user id extracted: ", userId);
            await products_1.productModel.create(appSpec_1.schema);
            const product = await products_1.productModel.index();
            pId = product[0].p_id;
            console.log("product id extracted: ", pId);
        });
        it(`should create new order`, async () => {
            const order = await orders_1.orderModel.create({
                u_id: userId,
                order_status: appSpec_1.schema.order_status,
            });
            expect(order?.message).toEqual("Order created successfully");
        });
        it(`should add product to order`, async () => {
            const op = await orderedProducts_1.OPT.addProducts({
                p_id: pId,
                order_id: appSpec_1.schema.order_id,
                quantity: appSpec_1.schema.quantity,
            });
            expect(op?.message).toEqual(`Product has been added successfully to order number (${appSpec_1.schema.order_id})`);
        });
        it(`should get all ordered products`, async () => {
            const op = await orderedProducts_1.OPT.index();
            expect(op[0].op_id).toEqual(appSpec_1.schema.op_id);
            expect(op[0].order_id).toEqual(appSpec_1.schema.order_id);
            expect(op[0].product_id).toEqual(pId);
            expect(op[0].quantity).toEqual(appSpec_1.schema.quantity);
        });
        it(`should get one ordered product by id`, async () => {
            const op = await orderedProducts_1.OPT.show(appSpec_1.schema.op_id);
            expect(op?.message).toEqual("Data generated successfully");
        });
        it(`should update the quantity of one ordered products by id`, async () => {
            const op = await orderedProducts_1.OPT.update(pId, 50);
            expect(op?.message).toEqual("Product quantity updated successfully");
        });
        it(`should delete one ordered products by id`, async () => {
            const op = await orderedProducts_1.OPT.delete(appSpec_1.schema.op_id);
            expect(op?.message).toEqual(`Row number ${appSpec_1.schema.op_id} was deleted successfully`);
        });
        afterAll(async () => {
            const conct = await database_1.default.connect();
            await conct.query("DELETE FROM ordered_products");
            await conct.query("DELETE FROM orders");
            await conct.query("DELETE FROM products");
            await conct.query("DELETE FROM users");
            await conct.query("ALTER SEQUENCE orders_order_id_seq RESTART WITH 1");
            await conct.query("ALTER SEQUENCE ordered_products_op_id_seq RESTART WITH 1");
            console.log("seq altered");
            conct.release();
        });
    });
});
