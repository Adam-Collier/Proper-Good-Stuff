var express = require("express");
var router = express.Router();
var fetch = require("node-fetch");
var jwt = require("jsonwebtoken");
var cloudinary = require("cloudinary");
var puppeteer = require("puppeteer");

var User = require("../models/User");

/* GET first API page */
// Routes are based on the route set for the file
router.get("/api", function(req, res, next) {
  console.log("token", req.headers.jwt);
  jwt.verify(req.headers.jwt, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
      res.json({ error: "jwt expired" });
    } else {
      console.log(decoded); // bar
      User.find({ team: decoded.team }, function(err, users) {
        console.log("these are the users", users);
        users = users.reduce((acc, curr) => acc.concat(curr.sites), []);
        res.header({
          user: decoded.name,
          id: decoded.slackId
        });
        res.send(users);
      });
    }
  });
});

router.get("/login", (req, res) => {
  res.redirect(
    "https://slack.com/oauth/authorize?client_id=161362817169.304108932706&scope=identity.basic"
  );
});

router.get("/callback", (req, res) => {
  let code = req.query.code;
  fetch(
    `https://slack.com/api/oauth.access?client_id=${
      process.env.CLIENT_ID
    }&client_secret=${process.env.CLIENT_SECRET}&code=${code}`
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data, "this is the data");
      console.log(process.env.JWT_SECRET, "this is the secret");
      var token = jwt.sign(
        {
          name: data.user.name,
          team: data.team.domain,
          slackId: data.user.id
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      var newUser = new User({
        name: data.user.name,
        email: data.user.email,
        team: data.team.domain,
        slackId: data.user.id,
        sites: []
      });
      newUser.save(function(err) {
        if (err) console.log(err);
        console.log("user saved 'apparently'");
      });
      res.redirect(`/?token=${token}`);
    });
});

router.post("/api", (req, res) => {
  jwt.verify(req.headers.jwt, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
      res.json({ error: "jwt expired" });
    } else {
      console.log(decoded); // bar
      User.findOne({ slackId: decoded.slackId }, function(err, user) {
        console.log(user);
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_NAME,
          api_key: process.env.CLOUDINARY_KEY,
          api_secret: process.env.CLOUDINARY_SECRET
        });

        (async () => {
          const browser = await puppeteer.launch();

          async function timeout(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }
          const page = await browser.newPage();

          await page.goto(req.body.website);
          await page.setViewport({ width: 1440, height: 850 });
          await timeout(7000);

          // console.log(await page.content());
          await page.screenshot({ type: "jpeg" }).then(data => {
            cloudinary.uploader.upload(
              `data:image/jpeg;base64,${data.toString("base64")}`,
              function(result) {
                console.log(result);
                user.sites.push({
                  website: req.body.title,
                  url: req.body.website,
                  img: result.secure_url,
                  addedBy: decoded.name,
                  date: new Date().toLocaleDateString()
                });

                user.save(function(err) {
                  if (err) return console.log(err);
                  else {
                    console.log("success!!!");
                    res.json({ finished: "yeah boyy" });
                  }
                });
              }
            );
          });
          await browser.close().then(() => {});
        })();
      });
    }
  });
});

router.post("/delete", (req, res) => {
  console.log(req.body);
  req.body.element === "site"
    ? User.findOne({ slackId: req.body.id }, function(err, user) {
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_NAME,
          api_key: process.env.CLOUDINARY_KEY,
          api_secret: process.env.CLOUDINARY_SECRET
        });
        let public_id = req.body.image.slice(62, -4);
        console.log("this is the id", public_id);
        cloudinary.uploader.destroy(public_id, function(result) {
          console.log(result);
        });
        user.sites.forEach((x, i) => {
          console.log(x._id);
          if (x._id == req.body.site) {
            console.log("yahhhh removing something");
            user.sites[i].remove();
          }
        });
        user.save(function(err) {
          if (err) console.log(err);
          console.log("site removed successfully");
        });
        res.send("blah");
      })
    : User.findOne({ slackId: req.body.id })
        .exec()
        .then(user => {
          user.sites.forEach((x, i) => {
            console.log(x.img);
            let public_id = x.img.slice(62, -4);
            cloudinary.config({
              cloud_name: process.env.CLOUDINARY_NAME,
              api_key: process.env.CLOUDINARY_KEY,
              api_secret: process.env.CLOUDINARY_SECRET
            });
            cloudinary.uploader.destroy(public_id, function(result) {
              console.log(result);
            });
          });
        })
        .then(() => {
          User.remove({ slackId: req.body.id }, function(err) {
            res.send("logout");
          });
        });
});

module.exports = router;
