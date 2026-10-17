import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db';
import { seedProductsIfEmpty } from './models/Product';
import { adminRouter } from './routes/admin';
import { publicRouter } from './routes/public';
import { paymentRouter } from './routes/payment';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(
  express.json({
    limit: '15mb',
    verify: (req: any, _res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'TastyPickle API',
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use('/api/payment', paymentRouter);
app.use('/api/admin', adminRouter);
app.use('/api', publicRouter);

// Export app for serverless / Vercel
export default app;

// Database initialization helper
export async function initDB() {
  try {
    await connectDB();
    await seedProductsIfEmpty();
  } catch (err) {
    console.error('Failed to initialize database:', err);
  }
}

// If run directly (not imported as a serverless module), listen on port
if (process.env.RUN_SERVER === 'true') {
  initDB().then(() => {
    app.listen(PORT, () => {
      console.log(`[TastyPickle Backend] Server running on http://localhost:${PORT}`);
    });
  });
}
