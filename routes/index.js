var express = require("express");
var router = express.Router();
var fetch = require("node-fetch");
var jwt = require("jsonwebtoken");
var cloudinary = require("cloudinary");
var puppeteer = require("puppeteer");

var User = require("../models/User");

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

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

      User.findOne({ email: data.user.email }, function(err, user) {
        console.log(user);
        console.log(!user);
        if (!user) {
          var newUser = new User({
            name: data.user.name,
            email: data.user.email,
            team: data.team.domain,
            slackId: data.user.id,
            sites: []
          });
          newUser.save(function(err) {
            if (err) console.log(err);
            console.log(process.env.NODE_ENV);
            console.log("user saved 'apparently'");
          });
        }
      });

      process.env.NODE_ENV === "production"
        ? res.redirect(`/?token=${token}`)
        : res.redirect(`http://localhost:3000/?token=${token}`);
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

        let saveSite = [];

        (async () => {
          const browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
          });

          async function timeout(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }
          const page = await browser.newPage();

          await page.goto(req.body.website);

          // desktop
          await page.setViewport({ width: 1500, height: 1400 });
          await timeout(7000);

          await page.screenshot({ type: "jpeg" }).then(data => {
            cloudinary.uploader.upload(
              `data:image/jpeg;base64,${data.toString("base64")}`,
              function(result) {
                console.log(result);
                saveSite.push({
                  website: req.body.title,
                  url: req.body.website,
                  desktop: result.secure_url,
                  addedBy: decoded.name,
                  date: new Date().toLocaleDateString()
                });
                return;
              }
            );
          });

          page.on("pageerror", function(err) {
            theTempValue = err.toString();
            console.log("Page error: " + theTempValue);
          });

          // mobile
          await page.emulate({
            name: "iPhone 6",
            userAgent:
              "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
            viewport: {
              width: 375,
              height: 667,
              deviceScaleFactor: 2,
              isMobile: true,
              hasTouch: true,
              isLandscape: false
            }
          });

          await timeout(3000);
          await page
            .screenshot({
              type: "jpeg"
            })
            .then(data => {
              cloudinary.uploader.upload(
                `data:image/jpeg;base64,${data.toString("base64")}`,
                result => {
                  saveSite[0].mobile = result.secure_url;
                  user.sites.push(saveSite[0]);
                  user.save(function(err) {
                    if (err) return console.log(err);
                    else {
                      console.log("success!!!");
                      res.json({
                        finished: "yeah boyy",
                        info: saveSite[0],
                        author: decoded.name
                      });
                    }
                  });
                  return;
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
        cloudinary.uploader.destroy(req.body.mobile.slice(62, -4), function(
          result
        ) {
          console.log(result);
        });
        console.log(req.body);
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
            console.log(x.desktop);
            let public_id = x.desktop.slice(62, -4);
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
