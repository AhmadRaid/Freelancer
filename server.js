const express = require("express");
const app = express();
const {handleSuccess} = require("./utils/response/success"); 
const {handleError} = require("./utils/response/error"); 
var bodyParser = require('body-parser')




app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", require("./routes/mainRoute"));

app.use("*", (req, res) => res.status(404).send("NOT FOUND PAGE Ahmad Raid"));

app.use((error, req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  if (error instanceof Error) {
    console.log('Global Error' , error)
    return handleError(error, req, res);
  }
  return handleSuccess(error, req, res);
});

require('./db/connect')

// require("./utils/Email/email"); 

const server = app.listen(3000, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server is running on localhost:3000`);
});
