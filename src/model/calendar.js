const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let calendarSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
}, {
  collection: 'calendars'
})

module.exports = mongoose.model('Calendar', calendarSchema)