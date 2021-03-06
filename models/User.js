var crypto = require("crypto");
var bcrypt = require("bcrypt-nodejs");
var mongoose = require("mongoose");

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

var userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    team: String,
    slackId: String,
    sites: [
      {
        website: String,
        url: String,
        desktop: String,
        addedBy: String,
        date: String,
        mobile: String
      }
    ]
  },
  schemaOptions
);

userSchema.pre("save", function(next) {
  var user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    cb(err, isMatch);
  });
};

userSchema.options.toJSON = {
  transform: function(doc, ret, options) {
    delete ret.password;
    delete ret.passwordResetToken;
    delete ret.passwordResetExpires;
  }
};

var User = mongoose.model("User", userSchema);

module.exports = User;
