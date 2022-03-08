import { dashBoard } from "./../../api/__services__/dashboard";

describe("Testing user Model functions: \n", () => {
  it("should be a method to get all products related to a user", () => {
    expect(dashBoard.getUserProducts).toBeDefined();
  });

  it("should be a method to get all products related to a user for specific orders", () => {
    expect(dashBoard.getUserProductsByOid).toBeDefined();
  });

  it("should be a method to get all products based on popularity, list is limited by 5 items", () => {
    expect(dashBoard.getProductByPopularity).toBeDefined();
  });

  it("should be a method to get all user's purachases that he/she made, list is sorted by most recent date", () => {
    expect(dashBoard.getUserMostPurchases).toBeDefined();
  });
});
