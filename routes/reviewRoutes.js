const express = require('express');
const reviewRouter  = express.Router();
const City = require('../models/city');
const User = require('../models/user')
const Review = require('../models/review')


reviewRouter.get('/cities/:id/reviews/new', (req, res ,next)=>{
  City.findById(req.params.id)
  .then((theCity)=>{
      res.render('addReview', {city: theCity})
  })
  .catch((err)=>{
    next(err)
  })

});

reviewRouter.post('/cities/:id/reviews/create', (req,res,next)=>{

  const cityId = req.params.id;
  const newReview  = {
    reviewer: req.user._id,
    lived: req.body.lived,
    rating: req.body.rating,
    food: req.body.food,
    sights: req.body.sights,
    nightlife: req.body.nightlife,

    comments: req.body.comments,
  };

  Review.create(newReview)
  .then( theReview => {
    console.log('just visited: ', theReview)

    if(theReview.lived === true){
      console.log('???????????')
      req.user.placesLived.push(cityId);
      req.user.save()
      .then( theUser => {
        console.log('saved: ', theUser)
        City.findById(cityId)
        .then( foundCity => {
          foundCity.reviews.push(theReview._id);
          foundCity.save()
          .then( () => {
              res.redirect(`/cities/${cityId}`)
          } )
          .catch( err => next(err))
        })
        .catch( err => next(err) )
      })
    } else {
      City.findById(cityId)
      .then( foundCity => {
        foundCity.reviews.push(theReview._id);
        foundCity.save()
        .then( () => {
          res.redirect(`/cities/${cityId}`)
        } )
        .catch( err => next(err))
      })
    }
  } )
  .catch( err => next(err) )

});


// reviewRouter.post('/cities/:id/reviews/delete/:reviewIndex', (req,res,next)=>{

//   const cityId = req.params.id;
//   const reviewIndex = req.params.review
//   City.findById(cityId)
//   .then((theCityThatImEditing)=>{
//     theCityThatImEditing.reviews.splice(review, 1)


//     theCityThatImEditing.save()
//     .then(()=>{
//       res.redirect('/cities/'+ cityId)
//     })
//     .catch((err)=>{next(err)})
//   })
// .catch((err)=>{next(err)})

// })

reviewRouter.get('/cities/:cityId/reviews/:reviewId', (req, res ,next)=>{
  const cityId = req.params.cityId;
  Review.findById(req.params.reviewId)
  .then((theReview)=>{
      res.render('eachReview', {review: theReview, cityId: cityId})
  })
  .catch((err)=>{
    next(err)
  })

});

// reviewRouter.get('/cities/:id', (req, res ,next)=>{
//   City.findById(req.params.id)
//   .then((theCity)=>{
//       res.render('eachCity', {city: theCity})
//   })
//   .catch((err)=>{
//     next(err)
//   })

// });









module.exports = reviewRouter
