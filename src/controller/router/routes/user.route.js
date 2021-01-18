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

    userModel.find({email : req.body.email}, function (err, docs) {
      if (docs.length){ //The email is already taken... too bad.
          console.log("This email is already taken :c");
      }else{ //Fine. we can save user's datas
        req.body.password = Bcrypt.hashSync(req.body.password, 10); //hash the password
        userModel.create(req.body, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.json(data);
          console.log("User created :D");
        }
      })
      }
    });
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