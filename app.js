const express = require('express');
const routes = require("./routes/routes");
const connectToDatabase = require('./database/connect');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use("/api-docs",swaggerUI.serve, swaggerUI.setup(swaggerDocument));

connectToDatabase();

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});