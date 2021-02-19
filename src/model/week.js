const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let weekSchema = new Schema({
  content: {
    type: String
  },
  date: {
    type: String
  },
  calendar: {
    type: mongoose.Schema.Types.ObjectId, ref: "calendars"
  },
  monthsPack: {
    type: mongoose.Schema.Types.ObjectId, ref: "monthsPack"
  },
  modules: {
    type: mongoose.Schema.Types.ObjectId, ref: "modules"
  },
  weekType: {
    type: mongoose.Schema.Types.ObjectId, ref: "weekTypes"
  },
},{
  collection: 'weeks'
})

module.exports = mongoose.model('Week', weekSchema)