import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import requestID from "express-request-id";
import exceptionHandling from "./api/middleware/exceptionHandler.js";
import container from "./config/Container.js";

async function createApp() {
  const app = express();

  // Middleware
  app.use(bodyParser.json());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));
  app.use(requestID());

  // CORS
  app.use(cors({ origin: "*" }));

  // Routes
  const userController = container.resolve("userController");

  app.use("/api/v1/users", userController.router);

  // Global Error Handler
  app.use(exceptionHandling);

  return app;
}

export default createApp;