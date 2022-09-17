import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let dbInstance: typeof mongoose | null = null;

export function setup() {
  mongoose.plugin((schema: any) => {
    schema.options.toJSON = {
      versionKey: false,
      transform(doc, ret) {
        delete ret._id;
      }
    };
  });

  mongoose.connection.on('error', (error) => {
    console.error('connection error:', error);
  });
}

export async function connect() {
  const uri: string = process.env.MONGO_URI!;
  const options = {
    autoIndex: true
  };

  await mongoose.connect(uri, options);
  dbInstance = mongoose;
}

export async function disconnect() {
  if (dbInstance) {
    await dbInstance.disconnect();
    dbInstance = null;
  }
  await mongoose.connection.close();
}

export function getDbInstance() {
  return dbInstance;
}

const db = Object.freeze({
  setup,
  connect,
  disconnect,
  getDbInstance
});

export default db;
