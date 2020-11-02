const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    select: false
  },
  phoneNumber: {
    type: String
  },
  googleId: {
    type: String
  },
  profilePhotoUrl: {
    type: String
  },
  cloudUploadName: {
    type: String
  },
  cloudUploadPreset: {
    type: String
  },
  certLevel: {
    type: String,
    enum: ["social foundation", "bronze", "silver", "gold", "open"]
  },
  memberStatus: [{
    type: String,
    enum: ["teacher", "student", "guest", "admin"],
    required: true
  }],
  birthday: {
    type: Date
  },
  userSessions: [
    {
      _id:false,
      session: {
        type: Schema.Types.ObjectId,
        ref: "Session",
      },
      sessionDate: Date,
      length: Number,
      isPresent: {
        type: Boolean
      }
    }
  ],
  steps: [{
    type: Schema.Types.ObjectId,
    ref: "Steps",
  }]
}, {
  toJSON: {virtuals: true}
});

UserSchema.set('timestamps', true);

UserSchema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.virtual('age')
  .get( function () {
    const bDate = this.birthday;
    const today = new Date();
    // console.log(bDate, today);
    const bM = bDate.getMonth();
    const bY = bDate.getFullYear();
    const tM = today.getMonth();
    const tY = today.getFullYear();
    // console.log(Math.floor((tY + tM / 12) - (bY + bM / 12)));
    return Math.floor((tY + tM / 12) - (bY + bM / 12));
  })

const User = mongoose.model("User", UserSchema);

User.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
  // return this.password;
}

module.exports = User;