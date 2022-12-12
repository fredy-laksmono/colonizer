require("dotenv").config();

module.exports = {
  development: {
    database: "colonizer_development",
    dialect: "postgres"
  },
  test: {
    database: "colonizer_test",
    dialect: "postgres"
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
};
