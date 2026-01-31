const swaggerAutogen = require('swagger-autogen')({ openapi: "3.0.0" });

const doc = {
  info: {
    title: 'Todo Application',
    description: 'This is a todo application'
  },
  host: 'localhost:5000/api',
  schemes: ['http'],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [ // apply globally if you want all protected endpoints to use it
    { bearerAuth: [] }
  ]
};

const outputFile = './swagger-output.json';
const routes = ['./router/apiRoutes.js'];

swaggerAutogen(outputFile, routes, doc);
