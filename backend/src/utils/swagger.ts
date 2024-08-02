import swaggerJsdoc from "swagger-jsdoc";
export * as swaggerUi from "swagger-ui-express";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRUD API documentation",
      version: "1.0.0",
      description: "CRUD API documentation",
    },
  },
  apis: [path.join(__dirname, "../routes/apartment.router.ts")], // Ensure this path is correct
};

export const specs = swaggerJsdoc(options);
