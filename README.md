## 🔥 Instalação e execução

- Faça um clone desse repositório;
- Rode `yarn` ou `npm install` para instalar as dependências;
- Crie o arquivo `.env` baseado no .env-sample e defina os valores para conexão ao banco de dados e o secret token do jwt.
- Caso prefira, pode inserir os dados do banco de dados direto no arquivo `/src/config/database.js`;
- Rode `yarn sequelize db:create` para criar o banco de dados;
- Rode `yarn sequelize db:migrate` para executar as migrations;
- Rode `yarn sequelize db:seed:all` para executar as seeders;
- Rode `yarn dev` para iniciar o servidor;
- Importe o arquivo `Insomnia_2021-04-08.json` desse repositório no Insomnia para testar as requests;
