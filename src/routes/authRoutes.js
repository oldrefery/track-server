const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", (req, res) => {
  const { email, password } = req.body;

  const user = new User({ email, password });
  user
    .save()
    .then(() => {
      const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");

      res.send({ token });
    })
    .catch((err) => {
      return res.status(422).send(err.message);
    });
});

module.exports = router;
