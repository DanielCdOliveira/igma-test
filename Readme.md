<div align="center"><img style = "max-width:400px;"src="https://i.imgur.com/P9mvcd4.jpg"></img></div>
<hr>
<h2 align=center>Igma technical test</h2>
<h3 align=center>Back-end development Project</h3>
<hr>
<h4 align=left>

# A customer registration API (Name, CPF, birth)

## Important:

Validate the CPF before recording the customer in the database

Endpoints

- [x] Endpoint to create customers (this endpoint should return a 422 if the cpf is invalid)

- [x] Endpoint to search customer by CPF

- [x] Endpoint to list all clients (using pagination)

CPF validation rules
The CPF can be passed in two formats:

999.999.999-00 (with mask)

99999999900 (numbers only)

To validate the CPF numbering, you can use the rules in the following link:

https://www.macoratti.net/alg_cpf.htm#:~:text=O

## Requirements

- Write the CPF validation algorithm manually (DO NOT use ready-made libs for this)

- Write your own CPF validation code (Do not copy from other source code)

- Send us a github repository with your source code

- Use a language that allows the use of object orientation such as Java, C#, Python, Javascript, etc.

- Choose your preferred database</h4>

<hr>

<p align="center">
   <img src="https://img.shields.io/badge/author-Daniel Oliveira-4dae71?style=flat-square" />
</p>

## :computer: Technologies and Concepts

- REST API
- Node.js
- TypeScript
- Postgresql
- Prisma
- Jest
- Supertest
- Docker

---

## :rocket: Routes

```yml
POST /users/signup
    - Route to register a new user
    - headers: {}
    - body: {
        "name":"teste",
        "cpf": "11144477735",
        "birthDate":"31/12/1998"
      }
```

```yml
GET /users?cpf=<cpf_value>
    - Route to get user using cpf
    - headers: {}
    - body:{}
```

```yml
GET /users/users/all?page=<page_number>
    - Route to get list of users with pagination (each page 10 results)
    - headers: {}
    - body:{}
```

---

## 🏁 Running the application

### Make sure you have the latest stable version of [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) running locally.

### Configure .env like the examples in code

<br>

First, clone this repository on your machine:

```
git clone https://github.com/DanielCdOliveira/igma-test
```

Run the following command to install the dependencies.

```
npm install
```

Once the process is finished, create database using prisma:

```
npm run prisma
```

Once the process is finished, just start the server:

> To run the application to the development environment:

```
npm run dev
```

> To run the integration testing application:

- it is necessary to create a **.env.test** file to run this command

```
npm run test
```

> To upload the unit tests application:

- it is necessary to create a **.env.test** file to run this command

```
npm run test:unit
```

> To run the project build with typescript:

```
npm run build
```

> To upload the application after the build:

```
npm run start
```

## Docker

> To run this app in production mode using docker:

- it is necessary to create a **.env.docker** file to run this command

```
npm run docker
```

## Thunder client

- For manual testing it is possible to import the file **thunder-collection_igma.json**
