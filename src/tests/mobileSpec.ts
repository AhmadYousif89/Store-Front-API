import { mobileStore } from "../models/mobile";

let mobId: string | undefined;
describe("Testing mobile Model functions: \n", () => {
  it("should have a get all mobiles method", () => {
    expect(mobileStore.getAllMobs).toBeDefined();
  });

  it("should have a get mobile by Id method", () => {
    expect(mobileStore.getMobById).toBeDefined();
  });

  it("should have a create method", () => {
    expect(mobileStore.createMob).toBeDefined();
  });

  it("should have an update mobile method", () => {
    expect(mobileStore.updateMob).toBeDefined();
  });

  it("should have a delete mobile method", () => {
    expect(mobileStore.delMob).toBeDefined();
  });

  describe("Testing SQL functions: \n ", () => {
    it(`should create new mobile`, async () => {
      const result = await mobileStore.createMob({
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
      const result = await mobileStore.getAllMobs();
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
      const result = await mobileStore.getMobById(mobId as string);
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
      const result = await mobileStore.updateMob(mobId as string, 500);
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
      const result = await mobileStore.delMob(mobId as string);
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
