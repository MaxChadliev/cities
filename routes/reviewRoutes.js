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


// reviewRouter.get("/edit", (req, res, next) => {
//   let isLived = false;
//   let places = [];
//   User.findById(req.user._id)
//     .then(foundUser => {
//       if (foundUser.placesLived.length !== 0) {
//         isLived = true;
//         foundUser.placesLived.forEach(onePlace => {
//           places.push(onePlace);
//         });
//       }
//       console.log("blah: ", isLived);
//       res.render("editProfile", { isLived, places });
//     })
//     .catch(err => next(err));
// });

// reviewRouter.post("/edit/:id", uploadCloud.single("photo"), (req, res, next) => {
//   const userId = req.params.id;
//   const updates = {
//     aboutMe: req.body.editedAboutMe,
//     image: req.file.url
//   };
//   User.findByIdAndUpdate(userId, updates)
//     .then(updatedUser => {
//       console.log("updated: ", updatedUser);
//       res.redirect(`/users/${userId}`);
//     })
//     .catch(err => next(err));
// });



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
reviewRouter.post('/reviews/reviewId/edit', (req,res,next)=>{
  const reviewId = req.params.reviewId;
  const editedReview = {
    title: req.body.editedTitle,
    genre: req.body.editedGenre,
    plot: req.body.editedPlot
  }

  // find by id and update expects two arguments to be passed.
  // id of the movie and changes taht we save din variable editedMvovie
  Movie.findByIdAndUpdate(movieId, editedMovie)
  .then( () =>{
    res.redirect(`/movies/${movieId}`);
  })
  .catch(err => console.log('Error while saving the changes after editing: ', err))
})






module.exports = reviewRouter
