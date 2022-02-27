import { userStore } from "./../models/users";

describe("Testing user Model functions: \n", () => {
  it("should have a get all users method", () => {
    expect(userStore.getAllUsers).toBeDefined();
  });
  it("should have a get user by Id method", () => {
    expect(userStore.getUserById).toBeDefined();
  });
  it("should have a create method", () => {
    expect(userStore.createUser).toBeDefined();
  });
  it("should have an update user method", () => {
    expect(userStore.updateUser).toBeDefined();
  });
  it("should have a delete user method", () => {
    expect(userStore.delUser).toBeDefined();
  });

  describe("Testing SQL functions: \n ", () => {
    let userId: string | undefined, userPw: string;
    it("should get all data and extract user Id and Password", async () => {
      const result = await userStore.getAllUsers();
      if (result) {
        userId = result[0].u_uid;
        console.log(`user id extracted: ${userId}`);
        userPw = result[0].u_password;
        console.log(`user pw extracted: ${userPw}`);
      }
      expect(result).toEqual([
        {
          u_uid: userId,
          u_name: "Ali",
          u_password: userPw,
        },
      ]);
      console.log("all users");
    });

    it("should return the correct user by ID", async () => {
      const result = await userStore.getUserById(userId as string);
      expect(result).toEqual([
        {
          u_uid: userId,
          u_name: "Ali",
          u_password: userPw,
        },
      ]);
      console.log("one user");
    });

    it(`should update the password to = abc for specific user by ID`, async () => {
      await userStore.updateUser(userId as string, "abc");
      const user = await userStore.getUserById(userId as string);
      if (user) {
        const userPw = user[0].u_password;
        expect(user).toEqual([
          {
            u_uid: userId,
            u_name: "Ali",
            u_password: userPw,
          },
        ]);
      }
      console.log("update user");
    });

    it("should delete the selected user by ID", async () => {
      userStore.delUser(userId as string);
      const result = await userStore.getAllUsers();
      expect(result).toEqual([]);
      console.log("delete user");
    });
  });
});
