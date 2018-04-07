var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var dotenv = require("dotenv");

var index = require("./routes/index");
var users = require("./routes/users");

// Load environment variables from .env file
dotenv.load();

var app = express();

// mongoose.connect(process.env.MONGODBLAB);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODBLAB, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

mongoose.connection.on("error", function() {
  console.log(
    "MongoDB Connection Error. Please make sure that MongoDB is running."
  );
  process.exit(1);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "client/build")));

app.use("/", index);
app.use("/users", users);
app.use("/delete", index);
app.use("/login", index);
app.use("/callback", index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
