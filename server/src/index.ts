import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';

dotenv.config();

const mongoURI = process.env.MONGO_URI || 'mongodb://root:example@127.0.0.1:27017/admin?authSource=admin';
mongoose.connect(mongoURI).then(() => {
  console.log('Connected to MongoDB');
}).catch((err: any) => {
  console.error('Failed to connect to MongoDB', err);
});

const app: Express = express();
const port = process.env.PORT || 3000;
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
