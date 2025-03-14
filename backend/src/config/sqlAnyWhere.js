const sql = require("any-db");

const sqlAnywhereConfig = {
  driver: "odbc",
  dsn: process.env.SQL_ANYWHERE_DSN,
  user: process.env.SQL_ANYWHERE_USER,
  password: process.env.SQL_ANYWHERE_PASS,
};

const sqlAnywhereConnection = sql.createConnection(sqlAnywhereConfig);

module.exports = sqlAnywhereConnection;
