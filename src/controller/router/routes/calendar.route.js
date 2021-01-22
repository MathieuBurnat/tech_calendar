const express = require('express');
const calendarRoute = express.Router();
var mongoose = require('mongoose');

// calendar model
let calendarModel = require('../../../model/calendar');

// year model
let yearModel = require('../../../model/year');

// trimester model
let trimesterModel = require('../../../model/trimester');

// week model
let weekModel = require('../../../model/week');

//config 
var trimestersCount = 4;
var weeksCount = 11;

calendarRoute.route('/').get((req, res) => {
    calendarModel.find((error, data) => {
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   })
 })

  calendarRoute.route('/get-full-calendar').post((req, res) => {
    //Should i creat a big-messa' object ? hm...

    console.log("(req) id : " + req.body.calendarId);

    //Find the correct calendar with its id.
    calendarModel.findOne({_id : req.body.calendarId}, function (err, docs) {
      var holyCalendar = { name : "", author : "", yearsList : []};
      
      
      //if something's find.
      if (typeof docs !== "undefined"){ 

        console.log("something's find :  " + docs);
        console.log("docs _id : " + docs._id);
        
        //set caladar's data
        holyCalendar.author = docs.author;
        holyCalendar.author = docs.name;

        //Get all years of the calendar
        yearModel.findOne({calendar : docs._id}, function (err, years) {

          //if something's find.
          console.log("Years :");
          if (typeof years !== "undefined"){ 
            console.log("something's find :  " + years);
            console.log("docs _id : " + years._id);
            
            //create the year
            year = {
              startingDate : years.startingDate,
              trimestersList :[]
            }

            /*
            calendarModel.findOne({_id : req.body.calendarId}, function (err, docs) {

            //if something's find.
            if (typeof docs !== "undefined"){ 
    
              console.log("something's find :  " + docs);
              console.log("docs _id : " + docs._id);
              
              //set caladar's data
              holyCalendar.author = docs.author;
              holyCalendar.author = docs.name;
              }
            });*/

            //push the actual year
            holyCalendar.yearsList.push(year);

            console.log("my Holy Calendar : ");
            console.log(holyCalendar);
          }
        });

      }
    });


  

    //With years's id, find all trimesters that are linked too.

    //omg what m-i doin' ?

    //With trimesters's id, get all weeks (...)
    

    //latter...
    //with all week's id, get all modules
    //same for weeksType


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

      createYear(newYear); //createYear -> creareTrimester -> createWeeks

      response.send({ message: "The calendar is created !", isCreated, calendar_id });
    }
    })
});

function createYear(newYear){
  console.log(JSON.stringify(newYear) );

  yearModel.create(newYear, (error, data) => {
    if (error) {
      return next(error);
    } else {
      //console.log("Year created :D");

      var newTrimester = {
        year: data._id
      }

      for (let i = 0; i < trimestersCount; i++) {
        createTrimester(newTrimester);
      }
    }
  })
}

function createTrimester(newTrimester)
{
  trimesterModel.create(newTrimester, (error, data) => {
    if (error) {
      return next(error);
    } else {
      //console.log("Trimester created :D");

      var newWeek = {
        trimester: data._id
      }

      for (let i = 0; i < weeksCount; i++) {
        createWeek(newWeek);
      }
    }
  })
}

function createWeek(newWeek){
  weekModel.create(newWeek, (error, data) => {
    if (error) {
      return next(error);
    } else {
      //console.log("Week created :D");
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