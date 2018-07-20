const express = require('express')
const userRouter = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport')

userRouter.get('/login',(req,res,next)=>{

  res.render('/cities', {message: req.flash('error')});

})

userRouter.post("/login", passport.authenticate("local", {
  successRedirect: "/cities",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));



userRouter.get('/logout', (req,res,next)=>{
  req.logout();
  res.redirect('/')
});

userRouter.get('/signup',(req,res,next)=>{

  res.render('signupPage');

})


userRouter.post('/signup', (req,res,next)=>{
  const thePassword = req.body.thePassword;
  const theUsername = req.body.theUsername;
  
  if (thePassword === "" || theUsername === ""){
    res.render('signupPage', {errorMessage: 'Please fill in the required fields'})
    return;
  }
  
  User.findOne({'username': theUsername})
  .then((responseFromDB)=>{
    if (responseFromDB !== null){
      res.render('signupPage', {errorMessage: 'That username is taken'})
      return;
    }
  
  
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(thePassword, salt);

  User.create({username: theUsername, password: hashedPassword})
  .then((user)=>{
    req.login(user, (err) => {
      if(err){
        next(err);
      }
      res.redirect('/edit')
    })
  })
  .catch((err)=>{
    next(err)
  })
})
})






module.exports = userRouter;




