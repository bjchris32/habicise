import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

export const dbConnect = async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri);
};

export const dbDisconnect = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

export const setupDB = () => {
  beforeEach(async () => {
    await dbConnect();  // Connect to the database before each test
  });

  afterEach(async () => {
    await dbDisconnect();  // Disconnect after each test
  });
};
