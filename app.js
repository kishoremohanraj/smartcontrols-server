const express = require("express");
const app = express();
const home = require("./routes/home");
const user = require("./routes/users");
const auth = require("./routes/auth");
const developers = require("./routes/developers");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/", home);
app.use("/api/auth", auth);
app.use("/api/users", user);
app.use("/api/developers", developers);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Listening on port " + port);
});
mongoose
  .connect("mongodb://localhost:27017/testdb", { useNewUrlParser: true })
  .then(() => console.log("connected to database"))
  .catch((err) => console.log("unable to connect" + err));
