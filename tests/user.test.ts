import app from "../src/app.js";
import supertest from "supertest";
import { prisma } from "../src/database.js";
import {
  userCpfValid,
  userCpfValid2,
  userCpfInvalidFirstDigitZero,
  userCpfInvalidSecondDigitZero,
  userCpfInvalid,
  userCpfInvalid2,
  userCpfInvalid3,
  userCpfInvalid4,
  userFormatInvalid,
  userFormatInvalid2,
  userFormatInvalid3,
  usersArray,
  userCpfInvalidFirstDigit,
  userCpfInvalidSecondDigit,
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
  it("return 422 for new user with with invalid first digit (when rest < 2)", async () => {
    const result = await supertest(app)
      .post("/users/signup")
      .send(userCpfInvalidFirstDigitZero);
    expect(result.status).toEqual(422);
  });
  it("return 422 for new user with with invalid first digit (when rest >= 2)", async () => {
    const result = await supertest(app)
      .post("/users/signup")
      .send(userCpfInvalidFirstDigit);
    expect(result.status).toEqual(422);
  });
  it("return 422 for new user with with invalid second digit (when rest < 2)", async () => {
    const result = await supertest(app)
      .post("/users/signup")
      .send(userCpfInvalidSecondDigitZero);
    expect(result.status).toEqual(422);
  });
  it("return 422 for new user with with invalid second digit (when rest >= 2)", async () => {
    const result = await supertest(app)
      .post("/users/signup")
      .send(userCpfInvalidSecondDigit);
    expect(result.status).toEqual(422);
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
    const result = await supertest(app)
      .post("/users/signup")
      .send(userCpfValid);
    expect(result.status).toEqual(409);
  });
});

describe("test get user by cpf route", () => {
  beforeEach(async () => {
    await prisma.users.deleteMany();
  });
  afterAll(async () => {
    await prisma.users.deleteMany();
    await prisma.$disconnect();
  });
  it("return 404 for user with cpf not found", async () => {
    const result = await supertest(app).get("/users?cpf=111.444.777-35");
    expect(result.status).toEqual(404);
  });
  it("return user for cpf registered and status 200", async () => {
    await supertest(app).post("/users/signup").send(userCpfValid);
    const result = await supertest(app).get("/users?cpf=111.444.777-35");
    const user = result.body;
    expect(result.status).toEqual(200);
    expect(user.name).toEqual(userCpfValid.name);
    expect(user.cpf).toEqual(userCpfValid.cpf);
    expect(user.birthDate).toEqual(userCpfValid.birthDate);
  });
  it("return 422 for cpf registered and invalid format", async () => {
    await supertest(app).post("/users/signup").send(userCpfValid);
    const result = await supertest(app).get("/users?cpf=111.44477735");
    expect(result.status).toEqual(422);
  });
  it("return 422 for blank cpf", async () => {
    await supertest(app).post("/users/signup").send(userCpfValid);
    const result = await supertest(app).get("/users");
    expect(result.status).toEqual(422);
  });
});

describe("test get all users", () => {
  beforeEach(async () => {
    await prisma.users.deleteMany();
  });
  afterAll(async () => {
    await prisma.users.deleteMany();
    await prisma.$disconnect();
  });
  it("return an array with 10 elements using the parameter page = 0", async () => {
    await prisma.users.createMany({ data: usersArray, skipDuplicates: true });
    const result = await supertest(app).get("/users/all?page=0");
    expect(result.status).toEqual(200);
    expect(result.body.length).toEqual(10);
  });
  it("return an array with 8 elements using the parameter page = 1", async () => {
    await prisma.users.createMany({ data: usersArray, skipDuplicates: true });
    const result = await supertest(app).get("/users/all?page=1");
    expect(result.status).toEqual(200);
    expect(result.body.length).toEqual(8);
  });
  it("return 422 for invalid page param", async () => {
    await prisma.users.createMany({ data: usersArray, skipDuplicates: true });
    const result = await supertest(app).get("/users/all?page=teste");
    expect(result.status).toEqual(422);
  });
});
