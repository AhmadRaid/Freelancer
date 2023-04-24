"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const app_1 = __importDefault(require("../app"));
require("dotenv").config();
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose.set("strictQuery", false);
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose
        .connect(process.env.mongoUrl, connectionParams)
        .then(() => {
        console.log("MongoDB Connected");
    })
        .catch((err) => {
        console.error(`Error connecting to the database. n${err}`);
    });
});
connectDB();
app_1.default.listen(3000, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server is running on localhost:3000`);
});
