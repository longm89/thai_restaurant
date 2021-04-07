const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
    isAdmin: Boolean, // whether the person is an admin or a normal user
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
      }
    ],
  })
  
  userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // the passwordHash should not be revealed
      delete returnedObject.passwordHash
    }
  })
  
  const User = mongoose.model('User', userSchema)
  
  module.exports = User