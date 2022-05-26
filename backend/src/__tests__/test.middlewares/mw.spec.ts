import handleAuthentication from "../../middlewares/auth";
import errorHandler from "../../middlewares/errors";

describe("Middleware functions: \n", () => {
  it("should be a method to handle authentication oprations", () => {
    expect(handleAuthentication).toBeDefined();
  });

  it("should be a method to handle our application generated errors", () => {
    expect(errorHandler).toBeDefined();
  });
});
