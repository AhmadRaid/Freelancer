const mongoose = require('mongoose');
require('dotenv').config();

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.set('strictQuery', false);

console.log(process.env.DB_CONNECTION);

const connectDB = async () => {
  await mongoose
    .connect(process.env.DB_CONNECTION, connectionParams)
    .then(() => {
      console.log('MongoDB Connected');
    })
    .catch((err) => {
      console.error(`Error connecting to the database. n${err}`);
    });
};
connectDB();
