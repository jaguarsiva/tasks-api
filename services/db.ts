import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export function setDatabase() {
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

  let dbInstance: typeof mongoose | null = null;

  async function connect() {
    const uri: string = process.env.MONGO_URI!;
    const options = {
      autoIndex: true
    };

    await mongoose.connect(uri, options);
    dbInstance = mongoose;
  }

  async function disconnect() {
    if (dbInstance) {
      await dbInstance.disconnect();
      dbInstance = null;
    }
    await mongoose.connection.close();
  }

  function getDbInstance() {
    return dbInstance;
  }

  return Object.freeze({
    connect,
    disconnect,
    getDbInstance
  });
}
