import request from "supertest"
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from "mongoose";
const bankController = require('../controller/Bank');

const requestAgent = request.agent('http://localhost:8080')

const userId = new mongoose.Types.ObjectId().toString()

export const bankPayload = {
    userId: userId,
    bankName: "Palestine",
    nameAccount: "Ahmad Raid 2",
    branch: "0446 - Raid",
    accountNumber: "2552322",
    Currency: "USD",
    ledger: "3000 - Current"
}
describe("bank", () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        mongoose.set("strictQuery", false);

        await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });
    describe("get Bank route", () => {
        describe("given the bank does not exist", () => {
            it("Should return a 404", async () => {
                let bankId = "dasda5d4a5sd4a5s4das4d5as4d5as4d5a4sd5a4s5d4a"
                requestAgent.get(`api/bank/show/${bankId}`)
                    .expect(404)
                    .end((err, res) => {
                        if (err) throw err;
                    })
            });
        });

        describe("given the Bank exist", () => {
            it("Should return a 200", async () => {

                const newBank = await bankController.addBank(bankPayload)

                const { body, statusCode } = await requestAgent.get(`api/bank/show/${newBank._id}`)
                .end((err, res) => {
                    if (err) throw err;
                })

                expect(statusCode).toBe(200)
                expect(body._id).toBe(newBank._id)
               
            });
        });


        // describe("Create Bank", () => {
        //     it("Should return a 200", async () => {

        //         const newBank = await bankController.addBank(bankPayload)

        //         const { body, statusCode } = await requestAgent.post(`api/bank/add`)
        //             .expect(404)
        //             .end((err, res) => {
        //                 if (err) throw err;
        //             })
        //     });
        // });
    });
});
