"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mobile_1 = require("../models/mobile");
let mobId;
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
        it(`should create new mobile`, async () => {
            const result = await mobile_1.mobileStore.createMob({
                brand_name: "Galaxy",
                model_name: "S20",
                manufacturer: "SAMSUNG",
                price: 900,
                made_in: "SK",
            });
            expect(result).toEqual({
                msg: "Mobile created successfuly",
                ...result,
            });
            console.log("mobile has been created");
        });
        it("should return a list of all mobiles", async () => {
            const result = await mobile_1.mobileStore.getAllMobs();
            mobId = result[0].mob_uid;
            expect(result).toEqual([
                {
                    mob_uid: mobId,
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
            const result = await mobile_1.mobileStore.getMobById(mobId);
            expect(result).toEqual({
                mob_uid: mobId,
                brand_name: "Galaxy",
                model_name: "S20",
                manufacturer: "SAMSUNG",
                price: 900,
                made_in: "SK",
            });
            console.log("one mobile");
        });
        it(`should update the price to = (500) for mobile by ID`, async () => {
            const result = await mobile_1.mobileStore.updateMob(mobId, 500);
            expect(result).toEqual({
                msg: "Mobile updated successfuly",
                data: {
                    mob_uid: mobId,
                    brand_name: "Galaxy",
                    model_name: "S20",
                    manufacturer: "SAMSUNG",
                    price: 500,
                    made_in: "SK",
                },
            });
            console.log("update mobile");
        });
        it(`should delete the selected mobile by ID`, async () => {
            const result = await mobile_1.mobileStore.delMob(mobId);
            expect(result).toEqual({
                msg: "Mobile deleted successfuly",
                data: {
                    mob_uid: mobId,
                    brand_name: "Galaxy",
                    model_name: "S20",
                    manufacturer: "SAMSUNG",
                    price: 500,
                    made_in: "SK",
                },
            });
            console.log("delete mobile");
        });
    });
});
