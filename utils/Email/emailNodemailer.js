"use strict";
const nodemailer = require("nodemailer");


const sendEmail = async() => {

// async..await is not allowed in global scope, must use a wrapper
const transporter = nodemailer.createTransport({
  service:'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'homework0592@gmail.com',
    pass: 'psjgqpvmeelslytx',
  },
});

transporter.verify().then('Success',console.log).catch('Error //////////////////',console.error);

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'homework0592@gmail.com', // sender address
    to: `ahmadraid256@gmail.com`, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "this is verification code email", // plain text body
    html: `<b>Test Ahmad Raid</b>`, // html body
  });

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendEmail().catch(console.error);

module.exports =sendEmail;
