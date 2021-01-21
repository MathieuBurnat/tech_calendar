const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let yearSchema = new Schema({
  startingDate: {
    type: String
  },
  calendar: {
    type: String
  },
},{
  collection: 'years'
})

module.exports = mongoose.model('Year', yearSchema)