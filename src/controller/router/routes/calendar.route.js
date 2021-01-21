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

  calendarRoute.route('/get-full-calendar').get((req, res) => {
    //Should i creat a big-messa' object ? hm...

    //Find the correct calendar with it id.
    
    //Get all its years

    //With years's id, find all trimesters that are linked too.

    //omg what m-i doin' ?

    //With trimesters's id, get all weeks (...)

    //latter...
    //with all week's id, get all modules
    //same for weeksType

    // test area

    var persons = [];
    
    var hobbies = [{category, name :"judo"}];


    var person = [{n: "mark", age: 23, isCrazy: true, hobbies}];


    var category = [{name: "test"},{name: "test"},{name: "test"},]



    for (let i = 0; i < 9; i++) 
    {
      persons.push(person);
    }

    //See all people
    console.log("Show persons's lists");

    console.log(persons);

    console.log("Show person's line");

    //try to get datas one per one 
    for (let i = 0; i < persons.length; i++)
    {
      console.log(persons[i]);

      for (let i2 = 0; i2 < persons[i].length; i2++)
      {
        //console.log("Name : " + person[i2]);
      }
    }

    /* Storing multi-line JSON string in a JS variable
using the new ES6 template literals */
var json = `{
  "book": {
      "name": "Harry Potter and the Goblet of Fire",
      "author": "J. K. Rowling",
      "year": 2000,
      "characters": ["Harry Potter", "Hermione Granger", "Ron Weasley"],
      "genre": "Fantasy Fiction",
      "price": {
          "paperback": "$10.40", "hardcover": "$20.32", "kindle": "$4.11"
      }
  }
}`;

// Converting JSON object to JS object
var obj = JSON.parse(json);

// Define recursive function to print nested values
function printValues(obj) {
  for(var k in obj) {
      if(obj[k] instanceof Object) {
          printValues(obj[k]);
      } else {
          console.log(obj[k] + "<br>");
      };
  }
};

// Printing all the values from the resulting object
printValues(obj);

console.log("<hr>");

// Printing a single value
console.log(obj["book"]["author"] + "<br>");  // Prints: J. K. Rowling
console.log(obj["book"]["characters"][0] + "<br>");  // Prints: Harry Potter
console.log(obj["book"]["price"]["hardcover"]);  // Prints: $20.32

    //

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
      console.log("Year created :D");

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
      console.log("Trimester created :D");

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
      console.log("Week created :D");
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