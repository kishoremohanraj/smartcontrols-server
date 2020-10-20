const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");

router.get("/devs", async (req, res) => {
  const devs = await User.find({ roleId: "developer" });
  res.send(devs);
});

router.get("/managers", async (req, res) => {
  const managers = await User.find({ roleId: "manager" });
  res.send(managers);
});

router.get("/:id", async (req, res) => {
  const user = await User.find({ _id: req.params.id });
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  let user = new User(
    _.pick(req.body, ["name", "email", "password", "roleId"])
  );

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
