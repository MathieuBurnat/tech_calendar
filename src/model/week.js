const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let weekSchema = new Schema({
  content: {
    type: String
  },
  trimester: {
    type: mongoose.Schema.Types.ObjectId, ref: "trimeters"
  },
  weekType: {
    type: mongoose.Schema.Types.ObjectId, ref: "weekTypes"
  },
  module: {
    type: mongoose.Schema.Types.ObjectId, ref: "modules"
  },
},{
  collection: 'weeks'
})

module.exports = mongoose.model('Week', weekSchema)