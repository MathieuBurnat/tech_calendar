const express = require('express');
const authRoute = express.Router();
const Bcrypt = require("bcryptjs");

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

 authRoute.route('/create-token').post((req, res, next) => {
  console.log("Something here ? " + req.body.user);

  /*
  authModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })*/
});


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