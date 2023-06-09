const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/routes.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "API Rest CCH2",
        description: "Projeto desenvolvido no curso de Engenharia de Software."
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Pessoa",
            "description": "Endpoints de pessoa"
        },
        {
            "name": "Projeto",
            "description": "Endpoints de projeto"
        }
    ]
}


swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./app.js')
});