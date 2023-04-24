const mongoose = require("mongoose");
import app from "../app";
require("dotenv").config();

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.set("strictQuery", false);

const connectDB = async () => {
  await mongoose
    .connect(process.env.mongoUrl, connectionParams)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err: any) => {
      console.error(`Error connecting to the database. n${err}`);
    });
};
connectDB();

app.listen(3000, () => {
  console.log(`Server is running on localhost:3000`);
}).on('error', (err) => {
  console.log(err);
  process.exit(1);
});
