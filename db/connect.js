const mongoose = require('mongoose');
require('dotenv').config();

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

mongoose.set("strictQuery", false);

console.log(process.env.mongoUrl);

const connectDB = async () => {
await mongoose.connect(process.env.mongoUrl ,connectionParams)
    .then( () => {
        console.log("MongoDB Connected");
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })
}
connectDB()


