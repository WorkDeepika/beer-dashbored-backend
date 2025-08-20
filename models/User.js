const mongoose = require("mongoose");

// Define schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Method to check password (plain text)
userSchema.methods.authenticate = function (password) {
  return this.password === password;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
