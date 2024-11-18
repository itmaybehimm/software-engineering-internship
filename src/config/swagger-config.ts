import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

export const setupSwagger = (app: Express) => {
  // Swagger definition
  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'This is a simple Express API application',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  };

  // Options for swagger-jsdoc
  const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts'],
  };

  const swaggerSpec = swaggerJSDoc(options);

  // Set up Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
