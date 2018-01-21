var express = require('express');
var router = express.Router();

/* GET first API page */
// Routes are based on the route set for the file
router.get('/api', function (req, res, next) {
  res.send([
    {
      website: 'ManvsMachine',
      url: 'https://www.mvsm.co.uk/',
      img: '/img/mvsm.png',
      addedBy: 'Adam Collier',
      date: '19/08/18'
    },
    {
      website: 'Buck Studio',
      url: 'http://buck.tv/',
      img: '/img/buck.png',
      addedBy: 'Adam Collier',
      date: '21/08/18'
    },
    {
      website: 'Airbnb',
      url: 'https://www.airbnb.co.uk/',
      img: '/img/airbnb.png',
      addedBy: 'Adam Collier',
      date: '17/08/18'
    },
  ]);
});

module.exports = router;
