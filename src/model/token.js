const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tokenSchema = new Schema({
  user: {
    type: String
  },
  token: {
    type: String
  },
  end_date: {
    type: String
  },
}, {
  collection: 'tokens'
})

module.exports = mongoose.model('Token', tokenSchema)