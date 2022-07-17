import { adminAuth, userAuth } from "../../middlewares/auth";
import errorHandler from "../../middlewares/errors";

describe("Middleware functions: \n", () => {
  it("should be a method to handle authentication oprations", () => {
    expect(adminAuth).toBeDefined();
  });
  it("should be a method to handle authentication oprations", () => {
    expect(userAuth).toBeDefined();
  });

  it("should be a method to handle our application generated errors", () => {
    expect(errorHandler).toBeDefined();
  });
});
