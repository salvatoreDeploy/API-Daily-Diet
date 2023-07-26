# Projeto API - Daily Diet

<h1 align="center">
<img alt="Daily Diet API" title="Daily Diet API" src=".github/images/daily-diet.svg" />
</h1>

<p align="center">
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-project">Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-requirements">Requirements</a>
</p>

<p align="center">
  <img  src="https://img.shields.io/static/v1?label=license&message=MIT&color=FFFFFF&labelColor=32B768" alt="License">
  
  <img src="https://img.shields.io/github/forks/salvatoreDeploy/API-Daily-Diet?label=forks&message=MIT&color=FFFFFF&labelColor=32B768" alt="Forks">

  <img src="https://img.shields.io/github/stars/salvatoreDeploy/API-Daily-Diet?label=stars&message=MIT&color=FFFFFF&labelColor=32B768" alt="Stars">
</p>

<p align="center">
  <img alt="Moveit" src=".github/images/cover.png">
</p>

### 🧪 Technologies

This project was developed using the following technologies:

- [Node.js](https://nodejs.org/en/)
- [Fastify](https://www.fastify.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Knex](https://knexjs.org/)
- [Vitest](https://vitest.dev/)

## 🚀 Getting started

Clone the project and access the folder

```bash
$ git clone https://github.com/salvatoreDeploy/API-Daily-Diet.git && cd API-Daily-Diet
```

Follow the steps below

```bash
# Install the dependencies
$ npm install

# Create a .env file and fill it with the environment variables from .env.example

# Create the database
$ npm run knex -- migrate:latest

# Start the project
$ npm run start:dev

# The server will start at port 3333 - go to http://localhost:3333

# In Folder insomnia you can find the insomnia file to test the API

# Run tests
$ npm run test

or

$ npm run test:watch

```

## 💻 Project

## 🔖 Layout

## 📝 License

---

## 📋 Requirements

### RF - Requisitos Funcionais

- [x] Deve ser possivel criar um usuario
- [x] Deve ser possivel identificar o usuario entre as requisições
- [x] Deve ser possivel registrar uma refeição feita, com as seguintes informações:
  - Nome
  - Descrição
  - Data e Hora
  - Estar dentro ou não dieta
- [x] Deve ser possivel editar uma refeição, podendo alterar todos dados a cima
- [x] Deve ser possivel listar todas as refeições de usuario
- [x] Deve ser possivel visualizar uma unica refeição
- [x] Deve ser posivel recuperar as métricas de um usuario
  - Quantidade total de refeições registradas
  - Quantidade total de refeições dentro da dieta
  - Quantidade total de refeições fora da dieta
  - Melhor sequencia de refeições dentro da dieta

### RN - Regras de Negocio

- [x] As Refeicões devem ser relacionados a um usuario
- [x] O usuario só pode visualizar, editar e apagar as refeições o qual ele criou

### RF - Requisitos Funcionais

- [x] Utilização de banco de dados para armazenamento das informações do usuário e das refeições
