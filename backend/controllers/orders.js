const ordersRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Order = require('../models/order')
const User = require('../models/user')
ordersRouter.get('/', (request, response) => {
    Order.find({}).populate('user').populate('items.item').then(
      orders => {
        response.json(orders)
      }
    )
    
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null 
}

ordersRouter.post('/', async (request, response, next) => {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)
    const newOrder = new Order({
        status: 'Currently processing', 
        user: user._id, 
        items: body.items,
        date: body.date, 
        cost: body.cost
    })
  
    const savedOrder = await newOrder.save()
    user.orders = user.orders.concat(savedOrder._id)
    await user.save()
    response.json(savedOrder)
  })

  ordersRouter.put('/:id', (request, response, next) => {
    const body = request.body
    const newOrder = {
      status: body.status, 
      user: body.user.id, 
      items: body.items.map(object => {return {qty: object.qty, item: object.item.id}}),
      date: body.date, 
      cost: body.cost
    }
    console.log('Try to update ', newOrder)
    Order.findByIdAndUpdate(request.params.id, newOrder, { new: true}).populate('user').populate('items.item')
      //option {new: true} return the object after updated
      .then(updatedOrder => {
        response.json(updatedOrder)
      })
      .catch(error => next(error))
  })
  
  module.exports = ordersRouter 