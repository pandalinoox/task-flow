import knex from "knex";

let db;

export const initializeDb = async (DB_URL) => {
  if (!db) {
    db = knex({
      client: "pg",
      connection: {
        connectionString: DB_URL,
        ssl: { rejectUnauthorized: false },
      },
    });
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
