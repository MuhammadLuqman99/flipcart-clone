// const mongoose = require("mongoose");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user) {
      return res.status(201).json({ message: "Already registered", user });
    }
    const { firstName, lastName, email, password } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      userName: Math.random().toString(),
    });
    _user.save((error, data) => {
      if (error) {
        res.status(400).json({ message: "Some thing went wrong" });
      }
      if (data) {
        return res.status(201).json({ message: data });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "12h",
        });
        const { _id, firstName, lastName, userName, email, role } = user;
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, userName, email, role },
        });
      } else {
        return res.status(400).json({ message: "Invalid password" });
      }
    } else {
      res.status(400).json({ message: "Something went wron" });
    }
  });
};
