import dotenv from "dotenv";
import swaggerAutogen from "swagger-autogen";

dotenv.config();

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || "3000";

const docSwagger = {
  info: {
    title: "Banco Imobiliário API",
    description: "Documentação da API Banco Imobiliário",
    version: "1.0.0",
  },
  host: `${HOST}:${PORT}`,
  definitions: {
    Player: {
      id: 1,
      name: "Player One",
      money: 1500,
      status: "active",
      icon: "🚀",
    },
    CreatePlayerDto: {
      name: "Player One",
      money: "1500",
      status: "active",
      icon: "🚀",
    },
    SuccessMessage: {
      message: "Operation completed successfully.",
    },
    BadRequest: {
      error: "Error details",
      message: "Bad request message",
    },
    Unauthorized: {
      error: "Error details",
      message: "Unauthorized message",
    },
    NotFound: {
      error: "Error details",
      message: "Not found message",
    },
    Error: {
      error: "Error details",
      message: "Error message",
    },
  },
};

const outputSwagger = './output-swagger.json';
const router = ['./router/index.ts'];

swaggerAutogen(outputSwagger, router, docSwagger);