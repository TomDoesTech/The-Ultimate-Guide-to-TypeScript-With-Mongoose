import { CreateQuery, FilterQuery, QueryFindBaseOptions } from "mongoose";
import User, { UserDocument, UserInput } from "../models/user.model";

export async function createUser(input: CreateQuery<UserInput>) {
  return User.create<UserInput>(input);
}

export async function findUser(
  query: FilterQuery<UserDocument>,
  options: QueryFindBaseOptions = { lean: true }
) {
  return User.findOne(query, null, options);
}

export async function loginUser({
  email,
  password,
}: {
  email: UserDocument["email"];
  password: UserDocument["password"];
}) {
  const user = await findUser({ email }, { lean: false });

  if (!user) {
    throw new Error("User does not exist");
  }

  return user.comparePassword(password);
}

export async function deleteAllUsers() {
  return User.deleteMany({});
}
