import { getDb } from "../data/db";

const User = {
  // Create user
  async create(data) {
    const db = getDb();
    const result = await db("users").insert(data).returning("*");

    // console.log(result);

    return result[0];
  },

  async findOne(filter) {
    const db = getDb();
    const result = await db("users").where(filter).first();
    // console.log(result);
    return result;
  },
};

export default User;
