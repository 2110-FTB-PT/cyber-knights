const { Client } = require('pg')

const DB_NAME = 'pet-rocks-db'

const CONNECTION_STRING =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`

// if (process.env.CI) {
//   client = new Client({
//     host: 'localhost',
//     port: 5432,
//     user: 'postgres',
//     password: 'postgres',
//     database: 'postgres',
//   })
// } else {
//   // local / heroku client config
//   client = new Client(CONNECTION_STRING)
// }

const client = new Client(CONNECTION_STRING)

module.exports = client
