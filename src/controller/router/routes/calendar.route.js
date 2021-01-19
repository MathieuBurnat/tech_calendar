const express = require('express');
const calendarRoute = express.Router();

// calendar model
let calendarModel = require('../../../model/calendar');

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

    calendarModel.create(req.body, (error, data) => {
    if (error) {
      response.send({ message: "The calendar is not created !", isCreated });

      return next(error)
    } else {
      isCreated = true;
      response.send({ message: "The calendar is created !", isCreated });
    }
  })
});

calendarRoute.route('/edit-calendar/:id').get((req, res) => {
   calendarModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

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