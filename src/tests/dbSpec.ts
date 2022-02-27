import { db } from "../models/db-test";

describe("Testing Database functions: \n", () => {
  it("should have a createTestDB method", () => {
    expect(db.createTestDB).toBeDefined();
  });

  it("should have a drop DB method", () => {
    expect(db.dropTestDB).toBeDefined();
  });

  it("should have a create Table for mobiles method", () => {
    expect(db.createTableMobiles).toBeDefined();
  });

  it("should have a create Table for users method", () => {
    expect(db.createTableUsers).toBeDefined();
  });

  it("should have a drop Table method for all tables", () => {
    expect(db.dropTables).toBeDefined();
  });
});
