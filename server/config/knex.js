import dotenvConfig from "./dotenv";

const knexConfig = {
  development: {
    client: "pg",
    connection: {
      connectionString: dotenvConfig.DB_URL,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: "./migrations",
    },
  },
};

export default knexConfig;
