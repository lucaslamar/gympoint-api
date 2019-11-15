# gym-point-api
Apis Gym Point - GoStack

## Instruções
Faça o clone do projeto e execute os comando abaixo.

`yarn install` - instala as dependencias 

`docker run --name gympoint-database -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:11` - cria um container do banco

`docker run --name gympoint-redis -p 6379:6379 -d -t redis:alpine` - cria um container do redis

`yarn sequelize db:migrate` - executa as migrações

`yarn sequelize db:seed:all` - roda todas as seeds

`yarn dev` - roda o projeto 

`yarn queue` - roda as filas
