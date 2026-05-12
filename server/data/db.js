import knex from "knex";
import knexConfig from "../config/knex";

let db;

export const initializeDb = async () => {
  if (!db) {
    db = knex(knexConfig.development);
    await db.raw("SELECT 1"); //connection status
    // console.log("DB initialized succesfully");
  }
};

export const getDb = () => {
  if (!db) {
    throw new Error("DB not inialized");
  }
  return db;
};
