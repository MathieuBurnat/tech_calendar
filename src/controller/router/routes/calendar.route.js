const express = require('express');
const calendarRoute = express.Router();
var mongoose = require('mongoose');

// calendar model
let calendarModel = require('../../../model/calendar');

// year model
let yearModel = require('../../../model/year');

calendarRoute.route('/').get((req, res) => {
    calendarModel.find((error, data) => {
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   })
 })

 calendarRoute.route('/create-calendar').post((req, response, next) => {
    var isCreated = false;
    var calendar_id = 0;

    console.log(JSON.stringify(req.body) );

    calendar = calendarModel.create(req.body, (error, data) => {
      if (error) {
      response.send({ message: "The calendar is not created !", isCreated });

      return next(error)
    } else {
      isCreated = true;

      calendar_id = data._id;

      
      //Create a year 
      var today = new Date();
      newYear = {
        startingDate : today.getDate() + '-' + today.getMonth()+1 +'-'+today.getFullYear(),
        calendar : calendar_id
      }
      createYear(newYear);

      response.send({ message: "The calendar is created !", isCreated, calendar_id });
    }
    })
});

function createYear(newYear){
  console.log(JSON.stringify(newYear) );

  yearModel.create(newYear, (error) => {
    if (error) {
      return next(error);
    } else {
      console.log("Year created :D");
    }
  })
}

calendarRoute.route('/edit-calendar/:id').get((req, res) => {
   calendarModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

calendarRoute.post("/get-id", async (request, response) => {
  try {
      console.log("Here we go..");
      //console.log("Name " + request.body);

      console.log( JSON.stringify(request.body) );

      var calendar = await calendarModel.findOne({ name: request.body.name }).exec();
      if(!calendar) {
        return response.send({ message: "Has not been found" });
      }
      var calendar_id = calendar._id;
      response.send({ message: "The username and password combination is correct!", calendar_id});
  } catch (error) {
      response.status(500).send(error);
  }
});

// Update calendar
calendarRoute.route('/update-calendar/:id').post((req, res, next) => {
  calendarModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('calendar successfully updated!')
    }
  })
})

// Delete calendar
calendarRoute.route('/delete-calendar/:id').delete((req, res, next) => {
  calendarModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})



module.exports = calendarRoute;