const express = require('express');
const router  = express.Router();
const User = require('../models/user')

/* GET home page */
router.get('/users/:userId', (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
  .then(theUser=>{

    res.render('userPage', { user: theUser });
  })
});



module.exports = router;
