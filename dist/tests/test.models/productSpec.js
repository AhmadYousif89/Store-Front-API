"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appSpec_1 = require("../test.app.routes/appSpec");
const products_1 = require("../../api/products/products");
let pId = "";
describe("Testing product Model functions: \n", () => {
    it("should be a method to get all products", () => {
        expect(products_1.productModel.create).toBeDefined();
    });
    it("should be a method to get a product by id", () => {
        expect(products_1.productModel.index).toBeDefined();
    });
    it("should be a method to create a new product", () => {
        expect(products_1.productModel.show).toBeDefined();
    });
    it("should be a method to update a product", () => {
        expect(products_1.productModel.update).toBeDefined();
    });
    it("should be a method to delete a product", () => {
        expect(products_1.productModel.delete).toBeDefined();
    });
    describe("Testing SQL functions: \n ", () => {
        it(`should create new product`, async () => {
            const result = await products_1.productModel.create(appSpec_1.schema);
            expect(result).toEqual({
                msg: "Product created successfully",
                ...result,
            });
            console.log("product has been created");
        });
        it("should return a list of all products", async () => {
            const result = await products_1.productModel.index();
            pId = result[0].p_id;
            expect(result).toEqual([
                {
                    p_id: pId,
                    category: appSpec_1.schema.category,
                    p_name: appSpec_1.schema.p_name,
                    brand: appSpec_1.schema.brand,
                    maker: appSpec_1.schema.maker,
                    price: appSpec_1.schema.price,
                    popular: appSpec_1.schema.popular,
                },
            ]);
            console.log("all products");
        });
        it("should return the correct product by id", async () => {
            const result = await products_1.productModel.show(pId);
            expect(result).toEqual({
                msg: "Product generated successfully",
                data: {
                    p_id: pId,
                    category: appSpec_1.schema.category,
                    p_name: appSpec_1.schema.p_name,
                    brand: appSpec_1.schema.brand,
                    maker: appSpec_1.schema.maker,
                    price: appSpec_1.schema.price,
                    popular: appSpec_1.schema.popular,
                },
            });
            console.log("one product");
        });
        it(`should update the price to = (500) and popular = 'yes' for product by id`, async () => {
            const result = await products_1.productModel.update(pId, 500, "yes");
            expect(result).toEqual({
                msg: "Product updated successfully",
                data: {
                    p_id: pId,
                    category: appSpec_1.schema.category,
                    p_name: appSpec_1.schema.p_name,
                    brand: appSpec_1.schema.brand,
                    maker: appSpec_1.schema.maker,
                    price: 500,
                    popular: "yes",
                },
            });
            console.log("update product");
        });
        it(`should delete the selected product by ID`, async () => {
            const result = await products_1.productModel.delete(pId);
            expect(result).toEqual({
                msg: "Product deleted successfully",
                data: {
                    p_id: pId,
                    category: appSpec_1.schema.category,
                    p_name: appSpec_1.schema.p_name,
                    brand: appSpec_1.schema.brand,
                    maker: appSpec_1.schema.maker,
                    price: 500,
                    popular: "yes",
                },
            });
            console.log("delete product");
        });
    });
});
