import dotenv from "dotenv";
import express from "express";
import router from "./router/index";
import cookieParser from "cookie-parser";
import { setCookieLanguage } from "./middlewares/setCookieLanguage";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./output-swagger.json";
import cors from "cors";
import { WebSocketServer } from "ws";

declare global {
  namespace Express {
    interface Player {
      id: string;
      profileId: string;
      [key: string]: any;
    }
    interface Request {
      player?: Player;
    }
  }
}

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:8080",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(setCookieLanguage);
app.use(
  session({
    genid: () => uuidv4(),
    secret: process.env.SECRET_KEY ?? "minha-chave-segura",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 10 * 24 * 60 * 60 * 1000 }, // 10 days
  }));

const wss = new WebSocketServer({
  port: process.env.WS_PORT ? Number(process.env.WS_PORT) : 3002,
});

wss.on("connection", (ws) => {
  console.log("New client connected " + Date.now());
  ws.on("error", console.error);

  ws.on("message", (message) => {
    console.log("received: %s", message);
    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected " + Date.now());
  });

  ws.send(
    JSON.stringify({
      event: "Connected",
      message: "Welcome to the WebSocket server!",
    })
  );
});

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

/*
start api: npm start
access swagger: http://localhost:3000/api
*/
