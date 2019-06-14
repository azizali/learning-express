const { model, Schema } = require('mongoose')

const notesModel = new Schema({
  name: {
    type: String,
    required: true
  },
  createDate: {
    type: Date,
    required: true,
    default: new Date()
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  }
})

module.exports = model('Notes', notesModel)
