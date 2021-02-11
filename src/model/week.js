const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let weekSchema = new Schema({
  content: {
    type: String
  },
  date: {
    type: String
  },
  isTheNewTrimester: {
    type: Boolean
  },
  calendar: {
    type: mongoose.Schema.Types.ObjectId, ref: "calendars"
  },
  weekType: {
    type: mongoose.Schema.Types.ObjectId, ref: "weekTypes"
  },
  modules: {
    type: mongoose.Schema.Types.ObjectId, ref: "modules"
  },
},{
  collection: 'weeks'
})

module.exports = mongoose.model('Week', weekSchema)