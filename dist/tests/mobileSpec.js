"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mobile_1 = require("../models/mobile");
const appSpec_1 = require("./appSpec");
describe("Testing mobile Model functions: \n", () => {
    it("should have a get all mobiles method", () => {
        expect(mobile_1.mobileStore.getAllMobs).toBeDefined();
    });
    it("should have a get mobile by Id method", () => {
        expect(mobile_1.mobileStore.getMobById).toBeDefined();
    });
    it("should have a create method", () => {
        expect(mobile_1.mobileStore.createMob).toBeDefined();
    });
    it("should have an update mobile method", () => {
        expect(mobile_1.mobileStore.updateMob).toBeDefined();
    });
    it("should have a delete mobile method", () => {
        expect(mobile_1.mobileStore.delMob).toBeDefined();
    });
    describe("Testing SQL functions: \n ", () => {
        it("should return a list of all mobiles", async () => {
            const result = await mobile_1.mobileStore.getAllMobs();
            expect(result).toEqual([
                {
                    mob_uid: appSpec_1.mobId,
                    brand_name: "Galaxy",
                    model_name: "S20",
                    manufacturer: "SAMSUNG",
                    price: 900,
                    made_in: "SK",
                },
            ]);
            console.log("all mobiles");
        });
        it("should return the correct mobile by ID", async () => {
            const result = await mobile_1.mobileStore.getMobById(appSpec_1.mobId);
            expect(result).toEqual({
                mob_uid: appSpec_1.mobId,
                brand_name: "Galaxy",
                model_name: "S20",
                manufacturer: "SAMSUNG",
                price: 900,
                made_in: "SK",
            });
            console.log("one mobile");
        });
        it(`should update the price to = (500) for mobile by ID`, async () => {
            const result = await mobile_1.mobileStore.updateMob(appSpec_1.mobId, 1000);
            expect(result).toEqual({
                msg: "Mobile updated successfuly",
                data: {
                    mob_uid: appSpec_1.mobId,
                    brand_name: "Galaxy",
                    model_name: "S20",
                    manufacturer: "SAMSUNG",
                    price: 1000,
                    made_in: "SK",
                },
            });
            console.log("update mobile");
        });
        it(`should delete the selected mobile by ID`, async () => {
            const result = await mobile_1.mobileStore.delMob(appSpec_1.mobId);
            expect(result).toEqual({
                mob_uid: appSpec_1.mobId,
                brand_name: "Galaxy",
                model_name: "S20",
                manufacturer: "SAMSUNG",
                price: 1000,
                made_in: "SK",
            });
            console.log("delete mobile");
        });
    });
});
