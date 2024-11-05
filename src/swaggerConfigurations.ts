const PORT = process.env.PORT || 3000;
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Management - API DOCS',
      version: '1.0.0',
      description: 'API untuk mengelola buku',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
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
  },
  apis: ['./src/routes/*.ts'],
};
export default swaggerOptions;
