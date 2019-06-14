const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  createDate: {
    type: Date,
    required: true,
    default: new Date()
  }
})

module.exports = model('Users', userSchema)
