const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'A simple CRUD API using Express and MySQL',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./index.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
