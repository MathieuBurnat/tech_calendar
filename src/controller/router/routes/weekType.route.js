const express = require('express');
const weekTypeRoute = express.Router();

// typeweek model
let weekTypeModel = require('../../../model/weekType');


weekTypeRoute.route('/').get((req, res) => {
    weekTypeModel.find((error, data) => {
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   })
 })

weekTypeRoute.route('/create-weekType').post((req, res, next) => {
    weekTypeModel.find({name : req.body.name}, function (err, docs) {
      if (docs.length){ //The email is already taken... too bad.
          console.log("This email is already taken :c");
      }else{ //Fine. we can save user's datas
          weekTypeModel.create(req.body, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.json(data);
          console.log("weekType created :D");
        }
      })
      }
    });
});

weekTypeRoute.route('/edit-weekType/:id').get((req, res) => {
    weekTypeModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update user
weekTypeRoute.route('/update-weekType/:id').post((req, res, next) => {
    weekTypeModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('weekType successfully updated!')
    }
  })
})

// Delete user
weekTypeRoute.route('/delete-weekType/:id').delete((req, res, next) => {
    weekTypeModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})


module.exports = weekTypeRoute;