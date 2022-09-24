import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../utils/logger';
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

  mongoose.connection.on('error', error => {
    logger.error('connection error:', error);
  });
}

export async function connect() {
  const mongoUri = process.env.MONGO_CLUSTER_URI!;
  const devDbName = process.env.DEV_DB_NAME!;
  const prodDbName = process.env.PROD_DB_NAME!;
  const dbName =
    process.env.NODE_ENV === 'development' ? devDbName : prodDbName;

  const uri = mongoUri + dbName + '?retryWrites=true&w=majority';

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
