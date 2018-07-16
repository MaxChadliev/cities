const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/homePage', (req, res, next) => {
  res.render('homePage');
});

module.exports = router;
