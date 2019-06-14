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
  },
  noteIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Notes'
  }]
})

module.exports = model('Users', userSchema)
