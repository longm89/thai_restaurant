const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.static('build'))
const itemsRouter = require('./controllers/items')
const usersRouter = require('./controllers/users')
const ordersRouter = require('./controllers/orders')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URL)

mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/menu', itemsRouter)
app.use('/api/users', usersRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app