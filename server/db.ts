import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn('WARNING: MONGODB_URI is not defined in environment variables.');
}

// Global cached connection for serverless/development reuse
declare global {
  var mongooseConnection: Promise<typeof mongoose> | null;
}

let cachedConnection = global.mongooseConnection;

if (!cachedConnection) {
  cachedConnection = global.mongooseConnection = null;
}

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  if (mongoose.connection.readyState >= 1) {
    return mongoose;
  }

  if (!cachedConnection) {
    cachedConnection = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
    global.mongooseConnection = cachedConnection;
  }

  try {
    const conn = await cachedConnection;
    console.log(`[MongoDB] Connected to database: ${conn.connection.name}`);
    return conn;
  } catch (err) {
    global.mongooseConnection = null;
    console.error('[MongoDB] Connection error:', err);
    throw err;
  }
}
