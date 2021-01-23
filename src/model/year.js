const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let yearSchema = new Schema({
  startingDate: {
    type: String
  },
  calendar: {
    type: mongoose.Schema.Types.ObjectId, ref: "calendars"
  },
},{
  collection: 'years'
})

module.exports = mongoose.model('Year', yearSchema)