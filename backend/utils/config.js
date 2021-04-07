require('dotenv').config()

const PORT = process.env.PORT || 3001
const MONGODB_URL = process.env.MONGODB_URL

module.exports = {
  MONGODB_URL,
  PORT
}