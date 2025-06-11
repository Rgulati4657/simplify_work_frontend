const db = require('../config/db');

async function findUserByUsername(username) {
  const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
}

module.exports = { findUserByUsername };

// Temporary mock implementation — will replace with MySQL later
// async function findUserByUsername(username) {
//   if (username === 'demo_user') {
//     return {
//       id: 1,
//       username: 'demo_user',
//       password: 'demo_pass' // no hashing yet
//     };
//   }
//   return null;
// }

// module.exports = { findUserByUsername };