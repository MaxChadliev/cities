const express = require("express");
const router = express.Router();
const User = require("../models/user");
const City = require("../models/city");
const multer = require("multer");
const uploadCloud = require("../config/cloudinary");

/* GET home page */
router.get("/users/:userId", (req, res, next) => {
  const userId = req.params.userId;
  let uniqueplaces = [];
  User.findById(userId)
  .populate('placesLived')
  .then(theUser => {
          res.render("userPage", { user: theUser}); 
      })
      .catch(err => next(err));
});

router.get("/edit", (req, res, next) => {
  let isLived = false;
  let places = [];
  User.findById(req.user._id)
    .then(foundUser => {
      if (foundUser.placesLived.length !== 0) {
        isLived = true;
        foundUser.placesLived.forEach(onePlace => {
          places.push(onePlace);
        });
      }
      console.log("blah: ", isLived);
      res.render("editProfile", { isLived, places });
    })
    .catch(err => next(err));
});

router.post("/edit/:id", uploadCloud.single("photo"), (req, res, next) => {
  const userId = req.params.id;
  const updates = {
    aboutMe: req.body.editedAboutMe,
  };
  if(req.file !== undefined){
    updates.image = req.file.url
  }
  User.findByIdAndUpdate(userId, updates)
    .then(updatedUser => {
      console.log("updated: ", updatedUser);
      res.redirect(`/users/${userId}`);
    })
    .catch(err => next(err));
});

module.exports = router;
