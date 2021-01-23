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
      
      
      //if on calendar is found
      if (typeof docs !== "undefined"){ 
        //Get years
        var yearsList = [];
        
        addYears(docs.id, function(yearsList){ //Here we use a recursive method to get our years then trimesters then weeks then [....]

          return yearsList;
        });

      }else{
        console.log("Any calendar has been found :c");
      }
    });

    //With years's id, find all trimesters that are linked too.

    //omg what m-i doin' ?

    //With trimesters's id, get all weeks (...)
    

    //latter...
    //with all week's id, get all modules
    //same for weeksType

    console.log("===== my Holy Calendar ======"); //Render data
    console.log(yearsList);  
  })

  function addYears(id, callback){
    yearModel.find({calendar : id}, function (err, years) { 
      var yearsList = [];

      console.log("= Years =");
      //if a years is found.
      if (typeof years !== "undefined"){ 

        console.log("[Years] something's found :  " + years);

        for (i = 0; i < years.length; i++) {
          var trimestersList = [];

          console.log("[Year] id : " + years[i]._id);

          var sd = years[i].startingDate;
        
          trimestersList = addTrimesters(years[i]._id, function(trimestersList){ //Here we use a recursive method to get our years then trimesters then weeks then [....]
            console.log("trimesters list ");  
            console.log(trimestersList);  

            year = {
              startingDate: sd,
              trimestersList
            }
            yearsList.push(year);

            console.log("my sweet yearsList : "); 
            console.log(yearsList); // <--

            return trimestersList;
          });
        }
        
        callback(yearsList);
        }
      });
  }
 
  function addTrimesters(id, callback){
    console.log("did you found me ? " + id);
    trimesterModel.find({year : id}, function (err, trimesters) { 
      var trimestersList = [];

      console.log("= trimesters =");
      //if a trimesters is found.
      if (typeof trimesters !== "undefined"){ 

        console.log("[trimesters] something's found :  " + trimesters);

        for (i = 0; i < trimesters.length; i++) {

          //new with week callback

          var id = trimesters[i]._id;
          weeksList = addweeks(trimesters[i]._id, function(weeksList){ //Here we use a recursive method to get our years then weeks then weeks then [....]


            //console.log("[trimester] id : " + id;
            trimester = {
              name : (i + "yeah, i'm totally crazy"),
              weeksList : weeksList // Yeah... The madness start... Again !
            }

            console.log("weeks list ");  
            console.log(weeksList);  

            trimestersList.push(trimester);
          });
          //
        }

        console.log("my trimestersList : ");
        console.log(trimestersList);
        
        callback(trimestersList);
        }
      });
  }

  function addweeks(id, callback){
    weekModel.find({trimester : id}, function (err, weeks) { 
      var weeksList = [];

      console.log("= weeks =");
      //if a weeks is found.
      if (typeof weeks !== "undefined"){ 

        console.log("[weeks] something's found :  " + weeks);

        for (i = 0; i < weeks.length; i++) {

          console.log("[week] id : " + weeks[i]._id);
          week = {
            name : "dance to the floor",
            weeksList : [] // Yeah... The madness start... Again !
          }
          weeksList.push(week);
        }

        console.log("my weeksList : ");
        console.log(weeksList);
        
        callback(weeksList);
        }
      });
  }


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


      for (let i = 0; i < 2; i++) { // TEST 
        createYear(newYear); //createYear -> creareTrimester -> createWeeks
      }

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