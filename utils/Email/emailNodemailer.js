"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (email,random_number) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service : "gmail",
    // host: process.env.EMAIL_HOST,
    // port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASSWORD, 
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'homework0592@gmail.com', // sender address
    to: `ahmadraid256@gmail.com, ${email}`, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "this is verification code email", // plain text body
    html: `<b>${random_number}</b>`, // html body
  });

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

//sendEmail().catch(console.error);

module.exports =sendEmail;
