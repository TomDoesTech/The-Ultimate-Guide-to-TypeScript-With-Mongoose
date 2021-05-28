import {
  createUser,
  deleteAllUsers,
  findUser,
  loginUser,
} from "../user.service";

describe("user service", () => {
  afterAll(async () => {
    await deleteAllUsers();
  });

  afterEach(async () => {
    await deleteAllUsers();
  });

  const userPayload = {
    firstName: "Jane",
    lastName: "Doe",
    password: "aPassword123",
    email: "jane@example.com",
  };

  describe("create user", () => {
    describe("given the input is valid", () => {
      it("should create a new user", async () => {
        const user = await createUser(userPayload);

        expect(user.password).toHaveLength(60);

        expect(user.firstName).toBe(userPayload.firstName);

        expect(user.lastName).toBe(userPayload.lastName);

        expect(user.email).toBe(userPayload.email);
      });
    });
  });

  describe("log user in", () => {
    describe("given the password is correct", () => {
      it("should return true", async () => {
        const user = await createUser(userPayload);

        const isValid = await loginUser({
          email: user.email,
          password: userPayload.password,
        });
        expect(isValid).toBeTruthy();
      });
    });

    describe("given the password is wrong", () => {
      it("should return false", async () => {
        const user = await createUser(userPayload);

        const isValid = await loginUser({
          email: user.email,
          password: "wrong!",
        });
        expect(isValid).toBeFalsy();
      });
    });
  });

  describe("virtual property", () => {
    it("should return the user full name", async () => {
      await createUser(userPayload);

      const user = await findUser(
        { email: userPayload.email },
        { lean: false }
      );

      expect(user?.fullName).toBe(
        `${userPayload.firstName} ${userPayload.lastName}`
      );
    });
  });
});
