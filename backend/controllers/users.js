const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Order = require('../models/order')

usersRouter.get('/', (request, response) => {
    User.find({}).populate('orders').then(
      users => {
        response.json(users)
      }
    )
    
})

usersRouter.get('/:id/orders', (request, response) => {
  const id = request.params.id 
  Order.find({user:id}).populate('items.item').then(
    orders => {
      response.json(orders)
    }
  )
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordHash,
        isAdmin: false, // whether the person is an admin or a normal user   
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter 