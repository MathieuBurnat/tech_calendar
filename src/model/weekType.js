const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let weekTypeSchema = new Schema({
  name: {
    type: String
  },
  color: {
    type: String
  },
}, {
  collection: 'weekTypes'
})

module.exports = mongoose.model('weekTypes', weekTypeSchema)