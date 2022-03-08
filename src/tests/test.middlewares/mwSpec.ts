import handleAuthentication from "../../middlewares/auth.middleware";
import errorHandler from "../../middlewares/error.middleware";

describe("Middleware functions: \n", () => {
  it("should be a method to handle authentication oprations", () => {
    expect(handleAuthentication).toBeDefined();
  });

  it("should be a method to handle our application generated errors", () => {
    expect(errorHandler).toBeDefined();
  });
});
