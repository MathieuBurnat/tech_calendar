const express = require('express');
const userRoute = express.Router();
const Bcrypt = require("bcryptjs");

// user model
let userModel = require('../../../model/user');

userRoute.route('/').get((req, res) => {
    userModel.find((error, data) => {
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   })
 })

 userRoute.route('/create-user').post((req, res, next) => {
    req.body.password = Bcrypt.hashSync(req.body.password, 10);

    userModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

userRoute.route('/edit-user/:id').get((req, res) => {
   userModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update user
userRoute.route('/update-user/:id').post((req, res, next) => {
  userModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('user successfully updated!')
    }
  })
})

// Delete user
userRoute.route('/delete-user/:id').delete((req, res, next) => {
  userModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = userRoute;