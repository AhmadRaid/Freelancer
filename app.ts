import express ,{Request , Response , NextFunction} from "express";
const app = express();
const { handleSuccess } = require("./utils/response/success");
const { handleError } = require("./utils/response/error");
var bodyParser = require("body-parser");
import multer  from 'multer'
import {uploadImageToFirebase} from "./utils/Firebase/uploadImage"
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const API_KEY = "MDUyYjVmZTUtZWVhYy00Yzg3LWExN2YtNzZjMGRjMmU0MWYw";
// const ONESIGNAL_APP_ID = "468731da-2cc8-4236-887e-8c9dae193f5c";
// const BASE_URL = "https://onesignal.com/api/v1";
//require('./utils/Notification/sendNotification')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({ storage: storage });

app.post('/uploadFile' , upload.single('file') , async(req: Request, res: Response) => {
  const url = await uploadImageToFirebase(req.file?.fieldname , req.file?.path)
  res.status(200).json({
    url
  })
})

//require('./utils/Email/emailNodemailer.js')

app.use("/api", require("./routes/mainRoute"));

app.use("*", (req: Request, res: Response) => res.status(404).send("NOT FOUND PAGE Ahmad Raid"));

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  if (error instanceof Error) {
    console.log("Global Error", error);
    return handleError(error, req, res);
  }
  return handleSuccess(error, req, res);
});

export default app;

