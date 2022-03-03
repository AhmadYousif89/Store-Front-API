"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../models/db");
describe("Testing Database functions: \n", () => {
    it("should have a create Table for users method", () => {
        expect(db_1.db.createTableUsers).toBeDefined();
    });
    it("should have a create Table for mobiles method", () => {
        expect(db_1.db.createTableMobiles).toBeDefined();
    });
    it("should have a drop Table method for all tables", () => {
        expect(db_1.db.dropTables).toBeDefined();
    });
});
