const sqlAnywhereConnection = require("..config/sqlAnyWhere");
const postgresClient = require("../config/postgres");

async function fetchAndStoreUsers() {
  return new Promise((resolve, reject) => {
    sqlAnywhereConnection.query(
      "SELECT * FROM acc_user",
      async (err, result) => {
        if (err) return reject(err);

        const users = result.rows;

        // Store data in PostgreSQL
        try {
          for (let user of users) {
            await postgresClient.query(
              `INSERT INTO users (id, name, email, phone) 
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (id) DO NOTHING`, // Prevents duplicate entries
              [user.id, user.name, user.email, user.phone]
            );
          }
          resolve("Users Synced Successfully");
        } catch (pgError) {
          reject(pgError);
        }
      }
    );
  });
}

module.exports = { fetchAndStoreUsers };
