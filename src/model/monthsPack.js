const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let monthsPackSchema = new Schema({
  name: {
    type: String
  },
  color: {
    type: String
  },
}, {
  collection: 'monthsPack'
})

module.exports = mongoose.model('monthsPack', monthsPackSchema)