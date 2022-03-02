"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mobile_1 = require("../models/mobile");
const appSpec_1 = require("./appSpec");
let mobId = "";
describe("Testing mobile Model functions: \n", () => {
    it("should have a get all mobiles method", () => {
        expect(mobile_1.mobileModel.getAllMobs).toBeDefined();
    });
    it("should have a get mobile by Id method", () => {
        expect(mobile_1.mobileModel.getMobById).toBeDefined();
    });
    it("should have a create method", () => {
        expect(mobile_1.mobileModel.createMob).toBeDefined();
    });
    it("should have an update mobile method", () => {
        expect(mobile_1.mobileModel.updateMob).toBeDefined();
    });
    it("should have a delete mobile method", () => {
        expect(mobile_1.mobileModel.delMob).toBeDefined();
    });
    describe("Testing SQL functions: \n ", () => {
        it(`should create new mobile`, async () => {
            const result = await mobile_1.mobileModel.createMob(appSpec_1.mobile);
            expect(result).toEqual({
                msg: "Mobile created successfully",
                ...result,
            });
            console.log("mobile has been created");
        });
        it("should return a list of all mobiles", async () => {
            const result = await mobile_1.mobileModel.getAllMobs();
            mobId = result[0].mob_uid;
            expect(result).toEqual([
                {
                    mob_uid: mobId,
                    brand_name: appSpec_1.mobile.brand_name,
                    model_name: appSpec_1.mobile.model_name,
                    manufacturer: appSpec_1.mobile.manufacturer,
                    price: appSpec_1.mobile.price,
                    made_in: appSpec_1.mobile.made_in,
                },
            ]);
            console.log("all mobiles");
        });
        it("should return the correct mobile by ID", async () => {
            const result = await mobile_1.mobileModel.getMobById(mobId);
            expect(result).toEqual({
                msg: "Mobile generated successfully",
                data: {
                    mob_uid: mobId,
                    brand_name: appSpec_1.mobile.brand_name,
                    model_name: appSpec_1.mobile.model_name,
                    manufacturer: appSpec_1.mobile.manufacturer,
                    price: appSpec_1.mobile.price,
                    made_in: appSpec_1.mobile.made_in,
                },
            });
            console.log("one mobile");
        });
        it(`should update the price to = (500) for mobile by ID`, async () => {
            const result = await mobile_1.mobileModel.updateMob(mobId, 500);
            expect(result).toEqual({
                msg: "Mobile updated successfully",
                data: {
                    mob_uid: mobId,
                    brand_name: appSpec_1.mobile.brand_name,
                    model_name: appSpec_1.mobile.model_name,
                    manufacturer: appSpec_1.mobile.manufacturer,
                    price: 500,
                    made_in: appSpec_1.mobile.made_in,
                },
            });
            console.log("update mobile");
        });
        it(`should delete the selected mobile by ID`, async () => {
            const result = await mobile_1.mobileModel.delMob(mobId);
            expect(result).toEqual({
                msg: "Mobile deleted successfully",
                data: {
                    mob_uid: mobId,
                    brand_name: appSpec_1.mobile.brand_name,
                    model_name: appSpec_1.mobile.model_name,
                    manufacturer: appSpec_1.mobile.manufacturer,
                    price: 500,
                    made_in: appSpec_1.mobile.made_in,
                },
            });
            console.log("delete mobile");
        });
    });
});
