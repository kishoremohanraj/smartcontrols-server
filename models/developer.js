const Joi = require("joi");
const mongoose = require("mongoose");

const developerSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  time1: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 7,
  },
  time2: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 7,
  },
  date: {
    type: String,
    required: true,
  },
});

const Developer = mongoose.model("Developer", developerSchema);

function validateData(data) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    time1: Joi.string().required(),
    time2: Joi.string().required(),
    date: Joi.string().required(),
  });

  return schema.validate(data);
}

exports.Developer = Developer;
exports.validateData = validateData;
