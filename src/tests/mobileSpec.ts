import { mobileModel } from "../models/mobile";
import { mobile } from "./appSpec";

let mobId = "";

describe("Testing mobile Model functions: \n", () => {
  it("should have a get all mobiles method", () => {
    expect(mobileModel.getAllMobs).toBeDefined();
  });

  it("should have a get mobile by Id method", () => {
    expect(mobileModel.getMobById).toBeDefined();
  });

  it("should have a create method", () => {
    expect(mobileModel.createMob).toBeDefined();
  });

  it("should have an update mobile method", () => {
    expect(mobileModel.updateMob).toBeDefined();
  });

  it("should have a delete mobile method", () => {
    expect(mobileModel.delMob).toBeDefined();
  });

  describe("Testing SQL functions: \n ", () => {
    it(`should create new mobile`, async () => {
      const result = await mobileModel.createMob(mobile);
      expect(result).toEqual({
        msg: "Mobile created successfully",
        ...result,
      });
      console.log("mobile has been created");
    });

    it("should return a list of all mobiles", async () => {
      const result = await mobileModel.getAllMobs();
      mobId = result[0].mob_uid as string;
      expect(result).toEqual([
        {
          mob_uid: mobId,
          brand_name: mobile.brand_name,
          model_name: mobile.model_name,
          manufacturer: mobile.manufacturer,
          price: mobile.price,
          made_in: mobile.made_in,
        },
      ]);
      console.log("all mobiles");
    });

    it("should return the correct mobile by ID", async () => {
      const result = await mobileModel.getMobById(mobId as string);
      expect(result).toEqual({
        msg: "Mobile generated successfully",
        data: {
          mob_uid: mobId,
          brand_name: mobile.brand_name,
          model_name: mobile.model_name,
          manufacturer: mobile.manufacturer,
          price: mobile.price,
          made_in: mobile.made_in,
        },
      });
      console.log("one mobile");
    });

    it(`should update the price to = (500) for mobile by ID`, async () => {
      const result = await mobileModel.updateMob(mobId as string, 500);
      expect(result).toEqual({
        msg: "Mobile updated successfully",
        data: {
          mob_uid: mobId,
          brand_name: mobile.brand_name,
          model_name: mobile.model_name,
          manufacturer: mobile.manufacturer,
          price: 500,
          made_in: mobile.made_in,
        },
      });
      console.log("update mobile");
    });

    it(`should delete the selected mobile by ID`, async () => {
      const result = await mobileModel.delMob(mobId as string);
      expect(result).toEqual({
        msg: "Mobile deleted successfully",
        data: {
          mob_uid: mobId,
          brand_name: mobile.brand_name,
          model_name: mobile.model_name,
          manufacturer: mobile.manufacturer,
          price: 500,
          made_in: mobile.made_in,
        },
      });
      console.log("delete mobile");
    });
  });
});
