const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const memberSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      required: true,
    },
    profilePictureUrl: {
      type: String,
      required: true,
    },
    linkedinUrl: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

memberSchema.pre(
  "save",
  { document: true, query: false },
  async function (next) {
    // console.log("this", this);
    if (!this.isModified("password")) return next();
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  }
);

memberSchema.methods.comparePassword = function(candidate){
  return bcrypt.compare(candidate, this.password);
};

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
