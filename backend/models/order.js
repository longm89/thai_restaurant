const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  status: String,  
  user:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  items: [
      {
      qty: Number, 
      item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Item'
        }
      }
    ],
  date: Date,
  cost: Number 
})

orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order