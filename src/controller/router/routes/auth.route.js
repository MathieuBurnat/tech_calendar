const express = require('express');
const authRoute = express.Router();
const Bcrypt = require("bcryptjs");
var mongoose = require('mongoose');

// auth model
let authModel = require('../../../model/token');

authRoute.route('/').get((req, res) => {
    authModel.find((error, data) => {
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   })
 })

 
 authRoute.route('/verify-authenticity').post((req, response) => {
  isTockenMatches = false;

  var ui = req.body;
  var token = authModel.findOne({ token: ui.token }).exec();

  //if the token is find in table and matches with the user.
  if(!token) {
    return response.send({ message: "This token does not exist", isTockenMatches });
  }

  if(ui.user != mongoose.Types.ObjectId(ui.user)){
    return response.send({ message: "The user doesn't matches with the token...", isTockenMatches });
  }

  //if the token is not out of date.
  // latter... 

  //Is everything's fine ?
  isTockenMatches = true;
  response.send({ message: "This token is valid !", isTockenMatches});

})

// Delete auth
authRoute.route('/delete-auth/:id').delete((req, res, next) => {
  authModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = authRoute;