const express = require("express");
const router = express.Router();
const { Developer, validateData } = require("../models/developer");
const _ = require("lodash");

router.get("/", async (req, res) => {
  const devData = await Developer.find();
  res.send(devData);
});

router.get("/:id", async (req, res) => {
  const devData = await Developer.find({ userId: req.params.id });
  res.send(devData);
});

router.post("/", async (req, res) => {
  const { error } = validateData(req.body);
  if (error) res.status(401).send(error.details[0].message);

  let data = new Developer(
    _.pick(req.body, ["userId", "time1", "time2", "date"])
  );
  await data.save();
});

module.exports = router;
