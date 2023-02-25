import app from "../src/app.js";
import supertest from "supertest";
import { prisma } from "../src/database.js";
import {
  userCpfValid,
  userCpfValid2,
  userCpfInvalid,
  userCpfInvalid2,
  userCpfInvalid3,
  userCpfInvalid4,
  userFormatInvalid,
  userFormatInvalid2,
  userFormatInvalid3,
} from "./factories/userFactory.js";

describe("test signup route", () => {
  beforeEach(async () => {
    await prisma.users.deleteMany();
  });
  afterAll(async () => {
    await prisma.users.deleteMany();
    await prisma.$disconnect();
  });
  it("return 201 for new user with cpf with mask", async () => {
    const result = await supertest(app)
      .post("/users/signup")
      .send(userCpfValid);
    expect(result.status).toEqual(201);
  });
  it("return 201 for new user with cpf without mask", async () => {
    const result = await supertest(app)
      .post("/users/signup")
      .send(userCpfValid2);
    expect(result.status).toEqual(201);
  });
  it("return 422 for new user with with invalid cpf format", async () => {
    const result = await supertest(app)
      .post("/users/signup")
      .send(userCpfInvalid);
    expect(result.status).toEqual(422);
  });
  it("return 422 for new user with with invalid cpf format 2", async () => {
    const result = await supertest(app)
      .post("/users/signup")
      .send(userCpfInvalid2);
    expect(result.status).toEqual(422);
  });
  it("return 422 for new user with with invalid cpf format 3", async () => {
    const result = await supertest(app)
      .post("/users/signup")
      .send(userCpfInvalid3);
    expect(result.status).toEqual(422);
  });
  it("return 422 for new user with with invalid cpf format 4", async () => {
    const result = await supertest(app)
      .post("/users/signup")
      .send(userCpfInvalid4);
    expect(result.status).toEqual(422);
  });
  it("return 422 for new user with with invalid body", async () => {
    const result = await supertest(app)
      .post("/users/signup")
      .send(userFormatInvalid);
    expect(result.status).toEqual(422);
  });
  it("return 422 for new user with with invalid body 2", async () => {
    const result = await supertest(app)
      .post("/users/signup")
      .send(userFormatInvalid2);
    expect(result.status).toEqual(422);
  });
  it("return 422 for new user with with invalid body 3", async () => {
    const result = await supertest(app)
      .post("/users/signup")
      .send(userFormatInvalid3);
    expect(result.status).toEqual(422);
  });
  it("return 409 for user with cpf already registered", async () => {
    await supertest(app).post("/users/signup").send(userCpfValid);
    const result2 = await supertest(app)
      .post("/users/signup")
      .send(userCpfValid);
    expect(result2.status).toEqual(409);
  });
});
