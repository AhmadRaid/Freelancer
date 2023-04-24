import { Response } from 'express';
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { createAccessToken, create_Tokens_with_cookie } from "../../utils/jwt";
import app from "../../app";
import { login } from "./auth.test."
const requestAgent = request.agent("http://localhost:4000/api");

export const officePayload = {
  name: "غزة مكتب الداتا",
  address: "الرمال تقاطع شارع فلسطين",
  timeWork: "9 صباحا ",
  fees: "بدون عمولة",
};

export const userPayload = {
  email: "a@a.com",
  password: "123456",
};

let token: string;
beforeAll(async () => {
  // const mongoServer = await MongoMemoryServer.create();
  mongoose.set("strictQuery", false);

  await mongoose.connect("mongodb://localhost/Freelancer");

});
beforeEach(async () => {
  try {
    token = await login();
  } catch (e) {
    expect(e).toMatch('error');
  }
});


afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe('GET /', () => {
  test('responds with 200 status code', async () => {
    request(app).get('/');
    expect((res : any) => {
      res.status = 200;
    });
  });
});


describe('post /', () => {
  it('responds with 200 status code', async () => {
    const response = await request(app).post('/api/office/add')
    .set('Authorization', `Bearer ${token}`)
    .send(officePayload);

    expect(response.status).toBe(200);

  
  });
});

