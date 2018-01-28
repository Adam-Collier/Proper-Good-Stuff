var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var jwt = require('jsonwebtoken');

var User = require('../models/User');

/* GET first API page */
// Routes are based on the route set for the file
router.get('/api', function (req, res, next) {
  console.log(req.headers.jwt);
  jwt.verify(req.headers.jwt, process.env.JWT_SECRET, function (err, decoded) {
    if(err) res.json({error: 'jwt expired'})
    console.log(decoded) // bar
    User.find({}, { _id: 0, team: 1, sites: 1}, function (err, users) {
      users = users.reduce((acc, curr) => acc.concat(curr.sites), []);
      res.send(users);
    })
  });
  // res.send([
    // {
    //   website: 'ManvsMachine',
    //   url: 'https://www.mvsm.co.uk/',
    //   img: '/img/mvsm.png',
    //   addedBy: 'Adam Collier',
    //   date: '19/08/18'
    // },
    // {
    //   website: 'Buck Studio',
    //   url: 'http://buck.tv/',
    //   img: '/img/buck.png',
    //   addedBy: 'Adam Collier',
    //   date: '21/08/18'
    // },
    // {
    //   website: 'Airbnb',
    //   url: 'https://www.airbnb.co.uk/',
    //   img: '/img/airbnb.png',
    //   addedBy: 'Adam Collier',
    //   date: '17/08/18'
    // },
    // {
    //   website: 'ManvsMachine',
    //   url: 'https://www.mvsm.co.uk/',
    //   img: '/img/mvsm.png',
    //   addedBy: 'Adam Collier',
    //   date: '19/08/18'
    // },
  //   {
  //     website: 'Buck Studio',
  //     url: 'http://buck.tv/',
  //     img: '/img/buck.png',
  //     addedBy: 'Adam Collier',
  //     date: '21/08/18'
  //   },
  //   {
  //     website: 'Airbnb',
  //     url: 'https://www.airbnb.co.uk/',
  //     img: '/img/airbnb.png',
  //     addedBy: 'Adam Collier',
  //     date: '17/08/18'
  //   },
  // ]);
});

router.get('/login', (req, res) => {
  res.redirect("https://slack.com/oauth/authorize?client_id=161362817169.304108932706&scope=identity.basic")
})

router.get('/callback', (req, res) => {
  let code = req.query.code;
  fetch(`https://slack.com/api/oauth.access?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`)
  .then(response => {
    return response.json();
  }).then(data => {
    console.log(data, "this is the data");
    console.log(process.env.JWT_SECRET, "this is the secret");
    var token = jwt.sign({
      name: data.user.name,
      team: data.team.domain,
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log(token);

    var newUser = new User({
      name: data.user.name,
      email: data.user.email,
      team: data.team.domain,
      sites: []
    });
    newUser.save(function (err) {
      if(err) console.log(err);
      console.log("user saved 'apparently'")
    });
    res.redirect(`http://localhost:3000?token=${token}`)
  })
})

module.exports = router;
