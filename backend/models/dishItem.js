const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: String,
    description: String,
    src:String,
    price: Number,
    courseType: String,
})
itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Item', itemSchema)