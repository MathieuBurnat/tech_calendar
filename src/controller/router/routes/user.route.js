const express = require('express');
const userRoute = express.Router();
const Bcrypt = require("bcryptjs");
var mongoose = require('mongoose');

// user model
let userModel = require('../../../model/user');

// token model 
let authModel = require('../../../model/token');

// calendar model 
let calendarModel = require('../../../model/calendar');

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
  var isPswrdMatches = false;
  try {
      var user = await userModel.findOne({ email: request.body.email }).exec();
      if(!user) {
        return response.send({ message: "L'adresse mail n'existe pas.", isPswrdMatches });
      }
      if(!Bcrypt.compareSync(request.body.password, user.password)) {
          return response.send({ message: "Le mot de passe est invalide.", isPswrdMatches  });
      }
      isPswrdMatches = true;

      //The username matches with password, so we create a token.
      var token = createToken(user._id);
      
      response.send({ message: "The username and password combination is correct!", isPswrdMatches, token});
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

userRoute.post("/set-default-calendar", async (req, response) => {
  try {
      calendarName = req.body.name;
      var calendar_id = "0";
      //Find calendar id with it name
      var calendar = await calendarModel.findOne({ name: calendarName }).exec();

      if(!calendar){
        console.log("the calendar is invalid.");
        return response.send({ message: "Invalid calendar."});
      }else{
        console.log("calendar founded :D");
      }
      
      console.log("calendar id : " + calendar._id);
      calendar_id = calendar._id;

      console.log("user id : " + mongoose.Types.ObjectId(req.body.user_id));

      userModel.findByIdAndUpdate({_id: mongoose.Types.ObjectId(req.body.user_id)}, {
        defaultCalendar: calendar._id
      }, function(resp) {
        console.log(resp);
      })
      
      return response.send({ message: "Default calendar set !", calendar_id });
      
  } catch (error) {
      response.status(500).send(error);
  }
});

//Create token (it's possible to return it to store)
function createToken(fk_user){ //....

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

    return token;
}

function verifyToken(){
  //...
}

module.exports = userRoute;