const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let modulesSchema = new Schema({
  name: {
    type: String
  },
  color: {
    type: String
  },
},{
  collection: 'modules'
})

module.exports = mongoose.model('Modules', modulesSchema)