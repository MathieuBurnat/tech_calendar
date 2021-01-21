const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let weekSchema = new Schema({
  content: {
    type: String
  },
  trimester: {
    type: String
  },
  weekType: {
    type: String
  },
  module: {
    type: String
  },
},{
  collection: 'weeks'
})

module.exports = mongoose.model('Week', weekSchema)