import request from "supertest";
import mongoose from "mongoose";
import app from "../../app";

beforeAll(async () => {
  mongoose.set("strictQuery", false);

  await mongoose.connect("mongodb://localhost/Freelancer");
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

export async function login() {

  const response = await request(app).post('/api/auth/login').send({
    email: "a@a.com",
    password: "123456",
  });
  return response.body.data.token.access_Token;
};

