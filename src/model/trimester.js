const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let trimesterSchema = new Schema({
  name: {
    type: String
  },
  year: {
    type: mongoose.Schema.Types.ObjectId, ref: "years"
  },
},{
  collection: 'trimesters'
})

module.exports = mongoose.model('Trimester', trimesterSchema)