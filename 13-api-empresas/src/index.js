const express = require('express');
const dbConnection = require('./db/connection');
const router = require('./routes/router');
const routerAutenticacao = require('./routes/autenticacao.router');
const swaggerUI = require('swagger-ui-express');

dbConnection();
const app = express();
const port = 3000;

app.use(express.json());

const swaggerDoc = require('./swagger.json');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use(routerAutenticacao);

const { checarToken } = require('./validators/autenticacaoValidacao');
app.use("/", checarToken, router);



app.listen(port, () => {
    console.log('Aplicação Rodando!');
})
