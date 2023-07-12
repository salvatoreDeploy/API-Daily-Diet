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

### RF - Requisitos Funcionais

- [ ] Deve ser possivel criar um usuario
- [ ] Deve ser possivel identificar o usuario entre as requisições
- [ ] Deve ser possivel registrar uma refeição feita, com as seguintes informações:
  - Nome
  - Descrição
  - Data e Hora
  - Estar dentro ou não dieta
- [ ] Deve ser possivel editar uma refeição, podendo lterar todos dados a cima
- [ ] Deve ser possivel listar todas as refeições de usuario
- [ ] Deve ser possivel visualizar uma unica refeição
- [ ] Deve ser posivel recuperar as métricas de um usuario
  - Quantidade total de refeições registradas
  - Quantidade total de refeições dentro da dieta
  - Quantidade total de refeições fora da dieta
  - Melhor sequencia de refeições dentro da dieta

### RN - Regras de Negocio

- [ ] As Refeicões devem ser relacionados a um usuario
- [ ] O usuario só pode visualizar, editar e apagar as refeições o qual ele criou

### RF - Requisitos Funcionais

- [ ] Utilização de banco de dados para armazenamento das informações do usuário e das refeições
- [ ] Utilização de autenticação por token para identificar o usuário entre as requisições
