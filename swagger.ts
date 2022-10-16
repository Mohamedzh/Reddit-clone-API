import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: 'Reddit clone API',
        description: 'API for the reddit clone app',
    },
    host: process.env.HOST_URL || 'localhost:5000',
    schemes: ['http', 'https']
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./src/index.ts']

swaggerAutogen()(outputFile, endpointsFiles, doc);

