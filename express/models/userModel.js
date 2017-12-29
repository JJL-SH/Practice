const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: 'string',
    unique: true
  },
  password: {
    type: 'string'
  },
  avatar: {
    type: 'string'
  },
  gender: {
    type: 'string',
    enum: ['m', 'f', 'x']
  },
  bio: {
    type: 'string'
  }
})

UserSchema.pre('save', (next) => {
  next()
})

module.exports = mongoose.model('User', UserSchema)
