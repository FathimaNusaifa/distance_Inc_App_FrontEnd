const express = require("express");

require("./db");
const userRouter = require("./routes/user");
require("dotenv").config();
var cors = require("cors");
//middleware
const app = express();

//envirment File
const PORT = process.env.PORT || 8001;
app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("<h1>MAM.AASIM</h1>");
});

app.listen(PORT, () => {
  console.log("app is running");
});
