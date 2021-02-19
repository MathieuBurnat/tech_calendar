const express = require('express');
const calendarRoute = express.Router();
var mongoose = require('mongoose');

// calendar model
let calendarModel = require('../../../model/calendar');

// monthsPack model
let monthsPackModel = require('../../../model/monthsPack');

// week model
let weekModel = require('../../../model/week');

// weekType model
let weekTypeModel = require('../../../model/weekType');

// week model
let modulesModel = require('../../../model/module');
const monthsPack = require('../../../model/monthsPack');


//config 
var monthsPackCount = 4;
var weeksCount = 52 / monthsPackCount;
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

  //Find all weeks into the calendar.
  weekModel.find({calendar : req.body.calendarId}, function (err, docs) {

    //if on calendar is found
    if (typeof docs !== "undefined"){ 
      
      //Get weeks with full content 
      GetWeeks(docs, res, function(weeks){
        message = "Works !";
        return res.send({ message, weeks});
      });
    }else{
      mesage = "Any calendar has been found :c"
      return res.send({ message });
    }
  });
})

async function GetWeeks(docs, res, callback){
  weeks = [];

  for (i = 0; i < docs.length; i++) {
    week = {
      content : docs[i].content,
      calendar : await getCalendar(docs[i].calendar),
      monthsPack : await getMonthsPack(docs[i].monthsPack),
    }
    weeks.push(week);
  }
  callback(weeks);
}

async function getCalendar(calendar_id){
  return new Promise(resolve => {
    calendarModel.findOne({_id: mongoose.Types.ObjectId(calendar_id)}, function (err, docs) { 
      if (typeof docs !== "undefined"){ 
        const calendar = {
          name : docs.name,
          author : "Author-Name"
        }
        resolve(calendar);
      }
    });
  });
}

async function getMonthsPack(monthsPack_id){
  return new Promise(resolve => {
    monthsPackModel.findOne({_id: mongoose.Types.ObjectId(monthsPack_id)}, function (err, docs) { 
      if (typeof docs !== "undefined"){ 
        const monthsPack = {
          start_date : docs.start_date,
          end_date : docs.end_date
        }
        resolve(monthsPack);
      }
    });
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

    fillCalendar(calendar_id, (getMonday(new Date()))); 

    res.send({ message: "The calendar is created !", isCreated, calendar_id });
    }
  })
});

function fillCalendar(calendar_id, st_date){
  const end_date = new Date();
  const start_date = st_date;

  for (let i = 0; i < monthsPackCount; i++) {
    //Uses the start_date (it begin at the monday)
    //Create the end_date while adding the number of weeks to end the monthsPack

    end_date.setDate(start_date.getDate() + (7 * weeksCount));

    createMonthsPack(calendar_id, start_date, end_date);
    
    //Reset the new start_date
    start_date.setDate(end_date.getDate());
  }
}

function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

function createMonthsPack(calendar_id, sd, ed){

  mp = {
    start_date : sd,
    end_date : ed,
  }
  console.log("-------[ What ]---------");
  console.log("Start_Date : " + sd.getDate() + '-' + sd.getMonth() + 1 +'-'+sd.getFullYear());  
  console.log("End_Date : " + ed.getDate() + '-' + ed.getMonth() + 1 +'-'+ed.getFullYear());
  console.log("----------------");

  monthsPack.create(mp, (error, data) => {
    if (error) {
      return next(error);
    }else{
      for (let i = 0; i < weeksCount; i++) 
      {
        createWeek(calendar_id, data._id);
      }
    }
  })
} 

function createWeek(calendar_id, monthsPack_id){

  week = {
    content : "Default",
    monthsPack : monthsPack_id,
    calendar : calendar_id
    //Futre :
    //->create and asign modules
    //->create and asign weekType
  }

  weekModel.create(week, (error, data) => {
    if (error) {
      return next(error);
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