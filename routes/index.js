const express = require('express');
const router  = express.Router();
const City = require('../models/city');
const User = require('../models/user');



/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

// generate route for cities, can check it in postman to see what route is
// route used in homepage.hbs ahref

router.get('/cities', (req, res, next) => {
  City.find()
  .then(citiesFromDB=>{
    res.render("allCities", {cities: citiesFromDB})
  })
  .catch(err => next(err)
  )
  // res.render('index');
});

router.get('/users', (req,res,next)=>{
  User.find()
})




module.exports = router;
