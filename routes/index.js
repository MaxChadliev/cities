const express = require('express');
const router  = express.Router();
const City = require('../models/city');
const User = require('../models/user');
const Review = require('../models/review');


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

router.get('/cities/:id', (req, res, next) => {
  const cityId = req.params.id;
  // console.log('id:', cityId)
  City.findById(cityId)
  .then(theCity =>{
    // create empty array to push all arrays later on so we can easily pass it to the view
    let reviewsArray = [];
    // go through the reviews (which is actually array of ids) for the found city and use each id to find review by id from DB 
    theCity.reviews.forEach( oneReviewId => {
      Review.findById(oneReviewId)
      .then( foundReview => {
        // foundReview is the review retrieved from DB which we will push into reviewsArray in few steps down
        // find who made thge review 
        User.findById(foundReview.reviewer)
        .then( foundReviewer => {
          // create additional fiewl in the foundReview object top store username of the reviewer (since so far we hgad only th id there)
          foundReview.realReviewer = foundReviewer.username;
        } )
        .catch( err => next(err) )
        // push the 'new' foundReview into reviewsArray
        reviewsArray.push(foundReview);
       
      } )
      .catch( err => next(err) )
    } )
    // when rendering the page pass the city and reviews array to hbs
    setTimeout( () => {
      res.render("cityDetails", {city: theCity, reviews: reviewsArray})
    }, 50 )
  })
  .catch(err => next(err)
  )
  // res.render('index');
});





router.get('/users', (req,res,next)=>{
  User.find()
})




module.exports = router;
