const express = require('express');
const userRoute = express.Router();
const Bcrypt = require("bcryptjs");

// user model
let userModel = require('../../../model/user');

// token model 
let authModel = require('../../../model/token');


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

// Login 
userRoute.post("/login", async (request, response) => {
  try {
      var user = await userModel.findOne({ email: request.body.email }).exec();
      if(!user) {
        console.log("The email does not exist");
        return response.status(400).send({ message: "The email does not exist" });
      }
      if(!Bcrypt.compareSync(request.body.password, user.password)) {
          console.log("The password is invalid");
          return response.status(400).send({ message: "The password is invalid" });
      }
      console.log("The username and password combination is correct!");

      //The username matches with password, so we create a token.
      CreateToken(user._id);

      response.send({ message: "The username and password combination is correct!" });

      

  } catch (error) {
      response.status(500).send(error);
  }
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

function CreateToken(fk_user){

    //Create token
    token = {
      user : fk_user,
      token: Bcrypt.hashSync((Math.floor(Math.random() * 100) + 1).toString(), 10),  // Hash an random integer created dynamically
    }

    authModel.create(token, (error, data) => {
      if (error) {
        return next(error)
      } else {
        console.log("Token created !");
      }
    });
}

module.exports = userRoute;