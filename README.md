<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src="https://github.com/lucaslamar/gym-point-api/blob/master/src/img/gympoint_logo.png" width="200px" />
</h1>

# GymPoint-api
> O GymPoint é um sistema de gerenciamento de academia


  <a href="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/blob/master/README.md#desafio-02-iniciando-aplica%C3%A7%C3%A3o"><img alt="Desafio 2" src="https://img.shields.io/badge/gympoint-desafio%202-brightgreen"> </a><a href="https://github.com/Rocketseat/bootcamp-gostack-desafio-03/blob/master/README.md#desafio-03-continuando-aplica%C3%A7%C3%A3o"><img alt="Desafio 3" src="https://img.shields.io/badge/gympoint-desafio%203-brightgreen"></a>



O GymPoint é um sistema de gerenciamento de academia que permite ao administrador cadastrado na aplicação as sequintes funcionalidades:
- Cadastro de Alunos (cadastrados/atualizados)
- Gestão de Planos (listagem/cadastro/atualização/remoção de planos)
- Gestão de Matriculas (listagem/cadastro/atualização/remoção de planos)
- Responder pedidos de auxilio

O GymPoint também permite que os alunos possam fazer:
- Checkins
- Pedidos de auxílio via email

 ## Começando

 <h3>Pré-requisitos</h3>

<ul>
    <li> <a href="https://nodejs.org/en/download/package-manager/"> NodeJS </a></li>
    <li> <a href="https://yarnpkg.com/en/docs/getting-started">Yarn</a> </li>
    <li> <a href="https://www.docker.com/get-started"> Docker </a> </li>
    <li> <a href="https://hub.docker.com/_/postgres">PostgreSQL</a> </li>
    <li> <a href="https://hub.docker.com/_/mongo">MongoDB</a> </li>
    <li> <a href="https://hub.docker.com/_/redis"> Redis </a> </li>
</ul>

<h4>REST API Client</h4>
<ul>
  <li><a href="https://insomnia.rest/">Insomnia</a></li>
  <li><a href="https://www.getpostman.com/">Postman</a></li>
  <li><a href="https://install.advancedrestclient.com/install">Advanced REST Client</a></li>
</ul>


## Configuração para Desenvolvimento

Depois de clonar repositorio e instalar os pre requisitos

- Run **`yarn`** to install dependencies;
- Crie uma **postgres** database;
- Crie uma **redis** database;
- Crie umm arquivo **`.env`** baseado **`.env.example`**;
- Ponha suas credencias **`.env`**;
- Rode **`yarn sequelize db:migrate`** para criar as migraçoes ;
- rode **`yarn sequelize db:seed:all`** para criar uma seed;
- rode **`yarn dev`** para iniciar a aplicação;
- rode **`yarn queue`** em outro terminal para iniciar as filas.

Agora você pode usar a REST API Client para testar "**Gympoint**".

## Construido com
<ul>
  <li>NodeJS</li>
  <li>Docker</li>
  <li>PostgreSQL</li>
  <li>Mailtrap.io</li>
  <li>Redis</li>
  <li>MongoDB</li>
</ul>

## Ferramentas
<ul>
  <li>Sucrase + Nodemon;</li>
  <li>ESLint + Prettier + EditorConfig;</li>
  <li>Sequelize</li>
</ul>
