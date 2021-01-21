const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let trimesterSchema = new Schema({
  name: {
    type: String
  },
  year: {
    type: String
  },
},{
  collection: 'trimesters'
})

module.exports = mongoose.model('Trimester', trimesterSchema)