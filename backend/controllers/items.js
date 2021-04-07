const itemsRouter = require('express').Router()
const Item = require('../models/dishItem')

itemsRouter.get('/', (request, response) => {
    Item.find({}).then(
      items => {
        response.json(items)
      }
    )
    
})

itemsRouter.post('/', (request, response) => {
    const body = request.body
    console.log(body)
    const item = new Item({
        name: body.name,
        description: body.description,
        src: body.src,
        price: body.price,
        courseType: body.courseType,
    })
  
    item.save().then(savedItem => {
      response.json(savedItem)
    })
  })
  
  module.exports = itemsRouter 