const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let monthsPackSchema = new Schema({
  start_date: {
    type: String
  },
  end_date: {
    type: String
  },
}, {
  collection: 'monthsPack'
})

module.exports = mongoose.model('monthsPack', monthsPackSchema)