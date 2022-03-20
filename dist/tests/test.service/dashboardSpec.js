"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orderedProducts_1 = require("../../api/orderedProducts/orderedProducts");
const orders_1 = require("../../api/orders/orders");
const products_1 = require("../../api/products/products");
const users_1 = require("../../api/users/users");
const appSpec_1 = require("../test.app.routes/appSpec");
const dashboard_1 = require("./../../api/__services__/dashboard");
let pId;
let userId;
describe("Testing dashboard Model functions: \n", () => {
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
    describe("Testing dashboard SQL functions: \n ", () => {
        it("should create user and a product and extract their ids", async () => {
            await users_1.userModel.create(appSpec_1.schema);
            const user = await users_1.userModel.index();
            userId = user[0].u_id;
            console.log("user id extracted: ", userId);
            await products_1.productModel.create({ ...appSpec_1.schema, popular: "yes" });
            const product = await products_1.productModel.index();
            pId = product[0].p_id;
            console.log("product id extracted: ", pId);
        });
        it(`should create new order`, async () => {
            const order = await orders_1.orderModel.create({
                u_id: userId,
                order_status: appSpec_1.schema.order_status,
            });
            expect(order?.msg).toEqual("Order created successfully");
        });
        it(`should add product to order`, async () => {
            const op = await orderedProducts_1.OPT.addProducts({
                ...appSpec_1.schema,
                p_id: pId,
            });
            expect(op?.msg).toEqual(`Product has been added successfully to order number (${appSpec_1.schema.order_id})`);
        });
        it(`should update order status`, async () => {
            const order = await orders_1.orderModel.update(appSpec_1.schema.order_id, "complete");
            expect(order?.msg).toEqual("Order updated successfully");
        });
        it("should get all products related to a user", async () => {
            const result = await dashboard_1.dashBoard.getUserProducts(userId);
            expect(result).not.toBeNull();
        });
        it("should get all products related to a user for specific order id", async () => {
            const result = await dashboard_1.dashBoard.getUserProductsByOid(userId, appSpec_1.schema.order_id);
            expect(result).not.toBeNull();
        });
        it("should get all purchases related to a user", async () => {
            const result = await dashboard_1.dashBoard.getUserMostPurchases(userId);
            expect(result).not.toBeNull();
        });
        it("should get all popular products", async () => {
            const result = await dashboard_1.dashBoard.getProductByPopularity();
            expect(result).not.toBeNull();
        });
    });
});
