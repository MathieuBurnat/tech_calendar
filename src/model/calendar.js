const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let calendarSchema = new Schema({
  name: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, ref: "users"
  },
}, {
  collection: 'calendars'
})

module.exports = mongoose.model('Calendar', calendarSchema)