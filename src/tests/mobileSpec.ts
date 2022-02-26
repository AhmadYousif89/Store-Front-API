import { mobileStore } from "../models/mobile";

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
    let mobId: string | undefined;
    it("should return a list of all mobiles", async () => {
      const result = await mobileStore.getAllMobs();
      if (result) {
        mobId = result[0].mob_uid;
        expect(result).toEqual([
          {
            mob_uid: mobId,
            brand_name: "Galaxy",
            model_name: "S20",
            manufacturer: "SAMSUNG",
            price: 1100,
            made_in: "SK",
          },
        ]);
      }
      console.log("all mobiles");
    });

    it("should return the correct mobile by ID", async () => {
      const result = await mobileStore.getMobById(mobId as string);
      expect(result).toEqual([
        {
          mob_uid: mobId,
          brand_name: "Galaxy",
          model_name: "S20",
          manufacturer: "SAMSUNG",
          price: 1100,
          made_in: "SK",
        },
      ]);
      console.log("one mobile");
    });

    it("should update the price to = (900) for specific mobile by ID", async () => {
      const result = await mobileStore.updateMob(mobId as string, 900);
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
      console.log("update mobile");
    });

    it("should delete the selected mobile by ID", async () => {
      mobileStore.delMob(mobId as string);
      const result = await mobileStore.getAllMobs();
      expect(result).toEqual([]);
      console.log("delete mobile");
    });
  });
});
