const { Client } = require('pg')

const DB_NAME = 'pet-rocks-db'

const CONNECTION_STRING =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`

const client = new Client(CONNECTION_STRING)

module.exports = client
