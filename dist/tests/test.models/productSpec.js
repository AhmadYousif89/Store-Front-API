"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appSpec_1 = require("../test.app/appSpec");
const products_1 = require("../../api/products/products");
let pId = "";
describe("Testing product Model functions: \n", () => {
    it("should have a get all products method", () => {
        expect(products_1.productModel.createProduct).toBeDefined();
    });
    it("should have a get product by Id method", () => {
        expect(products_1.productModel.getProducts).toBeDefined();
    });
    it("should have a create method", () => {
        expect(products_1.productModel.getProductById).toBeDefined();
    });
    it("should have an update product method", () => {
        expect(products_1.productModel.updateProduct).toBeDefined();
    });
    it("should have a delete product method", () => {
        expect(products_1.productModel.delProduct).toBeDefined();
    });
    describe("Testing SQL functions: \n ", () => {
        it(`should create new product`, async () => {
            const result = await products_1.productModel.createProduct(appSpec_1.product);
            expect(result).toEqual({
                msg: "product created successfully",
                ...result,
            });
            console.log("product has been created");
        });
        it("should return a list of all products", async () => {
            const result = await products_1.productModel.getProducts();
            pId = result[0].p_id;
            expect(result).toEqual([
                {
                    p_id: pId,
                    category: appSpec_1.product.category,
                    p_name: appSpec_1.product.p_name,
                    brand: appSpec_1.product.brand,
                    maker: appSpec_1.product.maker,
                    price: appSpec_1.product.price,
                    popular: appSpec_1.product.popular,
                },
            ]);
            console.log("all products");
        });
        it("should return the correct product by id", async () => {
            const result = await products_1.productModel.getProductById(pId);
            expect(result).toEqual({
                msg: "product generated successfully",
                data: {
                    p_uid: pId,
                    category: appSpec_1.product.category,
                    p_name: appSpec_1.product.p_name,
                    brand: appSpec_1.product.brand,
                    maker: appSpec_1.product.maker,
                    price: appSpec_1.product.price,
                    popular: appSpec_1.product.popular,
                },
            });
            console.log("one product");
        });
        it(`should update the price to = (500) and popular = 'yes' for product by ID`, async () => {
            const result = await products_1.productModel.updateProduct(pId, 500, "yes");
            expect(result).toEqual({
                msg: "product updated successfully",
                data: {
                    p_uid: pId,
                    category: appSpec_1.product.category,
                    p_name: appSpec_1.product.p_name,
                    brand: appSpec_1.product.brand,
                    maker: appSpec_1.product.maker,
                    price: 500,
                    popular: "yes",
                },
            });
            console.log("update product");
        });
        it(`should delete the selected product by ID`, async () => {
            const result = await products_1.productModel.delProduct(pId);
            expect(result).toEqual({
                msg: "product deleted successfully",
                data: {
                    p_uid: pId,
                    category: appSpec_1.product.category,
                    p_name: appSpec_1.product.p_name,
                    brand: appSpec_1.product.brand,
                    maker: appSpec_1.product.maker,
                    price: 500,
                    popular: "yes",
                },
            });
            console.log("delete product");
        });
    });
});
