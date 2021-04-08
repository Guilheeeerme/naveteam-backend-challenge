## 🔥 Instalação

- Faça um clone desse repositório;
- Rode `yarn` ou `npm install` para instalar as dependências;
- Crie o arquivo `.env` baseado no .env-sample e defina os valores para conexão ao banco de dados e o secret token do jwt.
- Caso prefira, pode inserir os dados do banco de dados direto no arquivo `/src/config/database.js`;
- Rode `yarn sequelize db:create` para criar o banco de dados;
- Rode `yarn sequelize db:migrate` para executar as migrations;
- Rode `yarn dev` para iniciar o servidor.
