require('dotenv').config()

const MONGO_DB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGO_DB_URI
    : process.env.MONGO_DB_URI
const PORT = process.env.PORT
const SECRET = process.env.SECRET

module.exports = { MONGO_DB_URI, PORT, SECRET }
