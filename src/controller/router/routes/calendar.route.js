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

// weekTypes model
let weekTypesModel = require('../../../model/weekTypes');

// week model
let modulesModel = require('../../../model/modules');


//config 
var yearsCount = 2;
var trimestersCount = 4;
var weeksCount = 11;
var wt_id = 23;

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

    //Find the correct calendar with its id.
    calendarModel.findOne({_id : req.body.calendarId}, function (err, docs) {

      //if on calendar is found
      if (typeof docs !== "undefined"){ 
        
        //call the calendar's getter. (Async method)
        AsyncCalendarGetter(docs, res, function(calendar){
          message = "Works !";
          return res.send({ message, calendar });
        });



        
        /*
        holyCalendar.name = docs.name;
        holyCalendar.author = docs.author;

        addYears_old(docs.id, function(yearsList){ //Here we use a recursive method to get our years then trimesters then weeks then [....]
          holyCalendar.yearsList = yearsList; //hmm ? i thing that we should push the year over there
        });

        setTimeout(() => {   //That's the ugliest thing i ever made.
          //console.log(" = Here's the holy calendar = ");
          console.log(holyCalendar);
          
          return res.send({ message, holyCalendar });
        }, 
        800);*/
      }else{

        mesage = "Any calendar has been found :c"
        return res.send({ message });
      }
    });
  })

async function AsyncCalendarGetter(docs, res, callback) {
  const calendar = await getCalendar(docs);

  console.log(calendar);

  callback(calendar);
}

async function getCalendar(docs){
  return new Promise(resolve => {
    var calendar = { 
      name : docs.name, 
      author : docs.author, //Here we could take the real author's name
      yearsList : [] //get years list 
    };
    resolve(calendar);
  });
}

  function addYears_old(id, callback){
    yearModel.find({calendar : id}, function (err, years) { 
      var yearsList = [];
      //if a year is found.
      if (typeof years !== "undefined"){ 
        for (i = 0; i < years.length; i++) {
          var trimestersList = [];
          var sd = years[i].startingDate;
          var debugName = ("[" + years[i]._id  + "]>" + i + " Year")

          addTrimesters_old(years[i]._id, function(newTrimestersList){ //Here we use a recursive method to get our years then trimesters then weeks then [....]
          year = {
            name : debugName,
            startingDate: sd,
            trimestersList : newTrimestersList,
          }
          yearsList.push(year);
          });
        }
        callback(yearsList);
      }
    });
  }
 
  function addTrimesters_old(id, callback){
    trimesterModel.find({year : id}, function (err, trimesters) { 
      var trimestersList = [];
      //if a trimesters is found.
      if (typeof trimesters !== "undefined"){ 
        for (i = 0; i < trimesters.length; i++) {
          var debugName = ("[" + trimesters[i]._id  + "]>" + i + " Trimester")

            //console.log("Before the while : " + debugName);
          addweeks_old(trimesters[i]._id, function(newWeeksList){ 
            //console.log("After the while : " + debugName);
          
            trimester = {
              name : debugName,
              weeksList : newWeeksList // Yeah... The madness start... Again !
            }
            trimestersList.push(trimester);
          });
        }
        callback(trimestersList);
      }
    });
  }

  function addweeks_old(id, callback){
    weekModel.find({trimester : id}, function (err, weeks) { 
      var weeksList = [];
      if (typeof weeks !== "undefined"){ 
        for (i = 0; i < weeks.length; i++) {
          
          var debugName = ("[" +  weeks[i]._id  + "]>" + i + " Week");
          var weekId = weeks[i]._id;
          var content = weeks[i].content;

          //console.log("before addwt " + weekId);

          addWeekType_old(weeks[i].weekType, weekId, function(newWeekType){ 
            week = {
              name : debugName,
              id : weekId,
              content : content,
              weekType : newWeekType, 
              module: "",
            }
            //console.log("inside addwt " + weekId);

            weeksList.push(week);
          });
        }
        callback(weeksList);
      }
    });
  }

  function addWeekType_old(id, weekId, callback){
    weekTypesModel.findOne({_id: mongoose.Types.ObjectId(id)}, function (err, weekType) { 
      if (typeof weekType !== "undefined"){ 
        weekType = {
          name : weekType.name,
          color : weekType.color,
        }
        callback(weekType);
      }
    });
  }

  function addModule_notUsed(id){ //I put the name wmodule because module is already taken by mongoose !
    modulesModel.find({_id : id}, function (err, wmodule) { 
      if (typeof wmodule !== "undefined"){ 
        wmodule = {
          name : wmodule.name,
          color : wmodule.color,
        }
        return wmodule;
      }
    });
  }

  calendarRoute.route('/create-calendar').post((req, res, next) => {
    var isCreated = false;
    var calendar_id = 0;

    calendar = calendarModel.create(req.body, (error, data) => {
      if (error) {
      res.send({ message: "The calendar is not created !", isCreated });

      return next(error)
    } else {
      isCreated = true;

      calendar_id = data._id;

      fillCalendar(calendar_id);

      res.send({ message: "The calendar is created !", isCreated, calendar_id });
    }
    })
});

function fillCalendar(calendar_id){
  //Dev option
  //Create a weeType to default and return its is
  createWeekType();

  for (let i = 0; i < yearsCount; i++)
    createYear(calendar_id); //createYear -> createTrimester -> createWeeks
}

function createWeekType(){
  weekType = {
    name : "default",
    color : "#f1e7e7"
  }

  weekTypesModel.create(weekType, (error, data) => {
    if (error) {
      return next(error);
    } else {
      //console.log("inside->matrix> wt_id : " + data._id);
      wt_id = data._id;
    }
  })
}

function createYear(calendar_id){
  //console.log("createY> wt_id" + wt_id);

  var today = new Date();
  newYear = {
    startingDate : today.getDate() + '-' + today.getMonth() + 1 +'-'+today.getFullYear(),
    calendar : calendar_id
  }

  yearModel.create(newYear, (error, data) => {
    if (error) {
      return next(error);
    } else {

  //console.log("srly ?> wt_id" + wt_id);
  //console.log("srly ?> tre" + trimestersCount);
      

      for (let i = 0; i < trimestersCount; i++) 
        createTrimester(data._id); // createTrimester -> createWeeks
    }
  })
}

function createTrimester(id)
{
  var newTrimester = {
    year: id
  }

  trimesterModel.create(newTrimester, (error, data) => {
    if (error) {
      return next(error);
    } else {
      //////console.log("Trimester created :D");

      for (let i = 0; i < weeksCount; i++) {
        createWeek(data._id);
      }
    }
  })
}

function createWeek(id){
  var newWeek = {
    trimester: id,
    content : "my week's content",
    weekType: wt_id,
  }


  weekModel.create(newWeek, (error, data) => {
    if (error) {
      return next(error);
    } else {
      //console.log("Assigned as : " + data._id);
      //console.log("wt_id : " + wt_id);
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

calendarRoute.post("/get-id", async (request, res) => {
  try {
      ////console.log("Here we go..");
      //////console.log("Name " + request.body);

      ////console.log( JSON.stringify(request.body) );

      var calendar = await calendarModel.findOne({ name: request.body.name }).exec();
      if(!calendar) {
        return res.send({ message: "Has not been found" });
      }
      var calendar_id = calendar._id;
      res.send({ message: "The username and password combination is correct!", calendar_id});
  } catch (error) {
      res.status(500).send(error);
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
      ////console.log('calendar successfully updated!')
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