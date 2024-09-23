import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import router from './config/routes';
import cors from 'cors';
import winston from 'winston';
import cookieParser from "cookie-parser";

dotenv.config();

const mongoURI = process.env.MONGO_URI || 'mongodb://mongodb:27017/mydatabase';

mongoose.connect(mongoURI).then(() => {
  console.log('Connected to MongoDB');
}).catch((err: any) => {
  console.error('Failed to connect to MongoDB', err);
});

const app: Express = express();
const backend_port = process.env.PORT || 4002;
const frontend_endpoint = process.env.FRONTEND_ENDPOINT || 'http://localhost';
const frontend_port = process.env.FRONTEND_PORT || 4001;

app.use(cors({
  origin: `${frontend_endpoint}:${frontend_port}`,
  credentials: true, // Allow cookies to be sent
}));
app.use(cookieParser());
app.use(express.json())

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/app.log" }),
  ],
});

app.use((req, res, next) => {
  // Log an info message for each incoming request
  logger.info(`Received a ${req.method} request for ${req.url}`);
  logger.log("info", "Request received: ", req);
  next();
});

app.use((err: any, req: any, res: any, next: any) => {
  // Log the error message at the error level
  logger.error(err.message);
  res.status(500).send();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use('/api', router);

app.listen(backend_port, () => {
  console.log(`[server]: Server is running at port: ${backend_port}`);
});
