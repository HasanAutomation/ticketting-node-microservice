import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongo: any;
beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (let collection in collections) {
    await collections[collection].deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
