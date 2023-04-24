// import request from "supertest"
// import { MongoMemoryServer } from 'mongodb-memory-server';
// import mongoose from "mongoose";
// const recipientController = require('../controller/Recipients');

// const requestAgent = request.agent('http://localhost:8080')

// const userId = new mongoose.Types.ObjectId().toString()

// export const recipientPayload = {
//     fullName: "Ahmad Raid 4",
//     phone : "0592610032",
//     idRecipientNumber : 32185566,
//     code:123456
// }
// describe("Recipients", () => {
//     beforeAll(async () => {
//         const mongoServer = await MongoMemoryServer.create();
//         mongoose.set("strictQuery", false);

//         await mongoose.connect(mongoServer.getUri());
//     });

//     afterAll(async () => {
//         await mongoose.disconnect();
//         await mongoose.connection.close();
//     });
//     describe("get Recipients route", () => {
//         describe("given the Recipients does not exist", () => {
//             it("Should return a 404", async () => {
//                 let bankId = "dasda5d4a5sd4a5s4das4d5as4d5as4d5a4sd5a4s5d4a"
//                 requestAgent.get(`api/recipient/show/${bankId}`)
//                     .expect(404)
//                     .end((err, res) => {
//                         if (err) throw err;
//                     })
//             });
//         });

//         describe("given the Recipients exist", () => {
//             it("Should return a 200", async () => {

//                 const newRecipient = await recipientController.addBank(recipientPayload)

//                 const { body, statusCode } = await requestAgent.get(`api/bank/show/${newRecipient._id}`)
//                 .end((err, res) => {
//                     if (err) throw err;
//                 })

//                 expect(statusCode).toBe(200)
//                 expect(body._id).toBe(newRecipient._id)
               
//             });
//         });


//         // describe("Create Recipient", () => {
//         //     it("Should return a 200", async () => {

//         //         const newRecipient = await recipientController.addRecipient(recipientPayload)

//         //         const { body, statusCode } = await requestAgent.post(`api/recipient/add`)
//         //             .expect(404)
//         //             .end((err, res) => {
//         //                 if (err) throw err;
//         //             })
//         //     });
//         // });
//     });
// });
















