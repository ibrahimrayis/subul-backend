import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Subul Backend API',
    version: '1.0.0',
    description: 'RESTful API for Subul e-commerce platform',
    contact: {
      name: 'API Support',
    },
  },
  servers: [
    {
      url: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}/api/${process.env.API_VERSION || 'v1'}`,
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/modules/**/routes/*.ts', './src/modules/**/routes/*.js'],
};

export const swaggerSpec = swaggerJSDoc(options);
