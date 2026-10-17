import app from '../server/index';
import { connectDB } from '../server/db';
import { seedProductsIfEmpty } from '../server/models/Product';

export default async function handler(req: any, res: any) {
  try {
    await connectDB();
    await seedProductsIfEmpty();
  } catch (err) {
    console.error('Database connection error in serverless handler:', err);
  }
  return app(req, res);
}
