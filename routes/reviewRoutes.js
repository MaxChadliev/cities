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
    let pushit = true;
    console.log('just visited: ', theReview)

    if(theReview.lived === true){
      console.log('???????????')


     req.user.placesLived.forEach(function (place) {
        if(place.equals(cityId)){
          pushit = false;
        }
      });
      
      
      if(pushit){
        req.user.placesLived.push(cityId);
      }

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




reviewRouter.get('/reviews/:reviewId/edit', (req,res,next)=> {
  const reviewId = req.params.reviewId;
  // console.log("id is: ", id);
  Review.findById(reviewId)
  .then(oneReview =>{
    // console.log('is this one movie: ', oneMovie);
    // we are passing oneMovie into the view as "movie", which helps us to pre-fill the form 
    // also this means that we have whole movie object available in our view
    res.render('editedReview', {review: oneReview})
  })
  .catch(err => console.log('Error while updating movie: ', err))
})


// // post route to pick up the changes and send it to DB
reviewRouter.post('/reviews/:reviewId/edit', (req,res,next)=>{
  const reviewId = req.params.reviewId;
  const editedReview = {
   rating: req.body.editedRating,
   food: req.body.editedFood,
   sights: req.body.editedSights,
   nightlife: req.body.editedNightlife,
   comments: req.body.editedComments

  }

  Review.findByIdAndUpdate(reviewId, editedReview)
  .then( () =>{
    res.redirect(`/cities`);
  })
  .catch(err => console.log('Error while saving the changes after editing: ', err))
})



reviewRouter.post('/cities/:id/reviews/:id/delete', (req,res,next)=>{

  const cityId = req.params.id;
  const reviewId = req.params.id;
  const reviewIndex = req.params.reviewIndex;
  City.findById(cityId)
  .then((theCityThatImEditing)=>{
    console.log("=========================")
    Review.findByIdAndRemove(reviewId)
    theCityThatImEditing.save()
    .then(()=>{
      res.redirect('/cities/'+ cityId)
    })
    .catch((err)=>{next(err)})
  })
.catch((err)=>{next(err)})



})



module.exports = reviewRouter
