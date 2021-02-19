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
var yearsCount = 2;
var monthsPackCount = 4;
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


//Old function to remove
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
      
    }else{

      mesage = "Any calendar has been found :c"
      return res.send({ message });
    }
  });
})

//Old function to remove
async function AsyncCalendarGetter(docs, res, callback) {
  const calendar = await getCalendar(docs);

  console.log(calendar);

  callback(calendar);
}

//Old function to remove
async function getCalendar(docs){
  return new Promise(resolve => {
    
    var calendar = { 
      name : docs.name, 
      author : docs.author, //Here we could take the real author's name
    };

    AsyncGetYears(docs.id, function(years){

      calendar.yearsList = years;

      resolve(calendar);

    });


  });
}

//Old function to remove
async function AsyncGetYears(calendar_id, callback) {
  const years = await getYears(calendar_id);

  console.log(years);

  callback(years);
}

//Old function to remove
async function getYears(calendar_id){
  return new Promise(resolve => {


    years = { 
      debugId: calendar_id,
      name: "my-year", 
      sd : "23"
      }

    //search for years that are assigned to the calendar

    yearModel.find({calendar : calendar_id}, function (err, years) { 
      var yearsList = [];
      
      //if a year is found.
      if (typeof years !== "undefined"){ 
        for (i = 0; i < years.length; i++) {
          var trimestersList = [];
          var sd = years[i].startingDate;
          var debugName = ("[" + years[i]._id  + "]>" + i + " Year")
          //const trimesters = await getTrimesters(2);
          year = {
            name : debugName,
            startingDate: sd,
            trimestersList : {},//newTrimestersList,
          }
          yearsList.push(year);
        }
        resolve(yearsList);
      }
    });
  });
}

//Old function to remove
async function getTrimesters(year_id) {
  return new Promise(resolve => {

      //search for trimesters that are assigned to the year

      //for each trimesters
          //set datas like debug name

          //get weeks
          //const weeks = await getWeeks(trimester_id); //...
          
          //set weeks into the trimester
      //end of the for
          
    resolve(years);
  });
}

//Old function to remove
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
 
//Old function to remove
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

//Old function to remove
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

//Old function to remove
function addWeekType_old(id, weekId, callback){
  weekTypeModel.findOne({_id: mongoose.Types.ObjectId(id)}, function (err, weekType) { 
    if (typeof weekType !== "undefined"){ 
      weekType = {
        name : weekType.name,
        color : weekType.color,
      }
      callback(weekType);
    }
  });
}

//Old function to remove
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

//Refactoring to do
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
  for (let i = 0; i < monthsPackCount; i++) {
    creatMonthsPack(calendar_id);
  }
}

function creatMonthsPack(calendar_id){
  var today = new Date();

  mp = {
    start_date : today.getDate() + '-' + today.getMonth() + 1 +'-'+today.getFullYear(),
    end_date : today.getDate() + '-' + today.getMonth() + 1 +'-'+today.getFullYear(),
  }

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
  var today = new Date();

  week = {
    content : "Default",
    date : today.getDate() + '-' + today.getMonth() + 1 +'-'+today.getFullYear(),
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

//Old function
function createWeekType(){ 
  weekType = {
    name : "default",
    color : "#f1e7e7"
  }

  weekTypeModel.create(weekType, (error, data) => {
    if (error) {
      return next(error);
    } else {
      //console.log("inside->matrix> wt_id : " + data._id);
      wt_id = data._id;
    }
  })
}

//Old function to remove
function createYear_old(calendar_id){ //Old !!
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

//Old function to remove
function createTrimester_old(id) //Old !!
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

//Old function to remove
function createWeek_old(calendar_id){
  var newWeek = {
    calendar: calendar_id,
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