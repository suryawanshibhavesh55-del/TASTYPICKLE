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

// Health Checks (both /api/health and /health) - immediate response, no DB dependency
const healthHandler = (_req: express.Request, res: express.Response) => {
  res.json({
    status: 'ok',
    service: 'TastyPickle API',
    timestamp: new Date().toISOString(),
  });
};
app.get('/api/health', healthHandler);
app.get('/health', healthHandler);

// Serverless database connection middleware (reuses cached connection for data routes)
let isSeeded = false;
app.use(async (_req, _res, next) => {
  try {
    await connectDB();
    if (!isSeeded) {
      await seedProductsIfEmpty();
      isSeeded = true;
    }
  } catch (err) {
    console.error('[MongoDB Serverless Middleware]:', err);
  }
  next();
});

// Mount Routes (support both /api/* and rewritten /* prefixes)
app.use('/api/payment', paymentRouter);
app.use('/payment', paymentRouter);

app.use('/api/admin', adminRouter);
app.use('/admin', adminRouter);

app.use('/api', publicRouter);
app.use('/', publicRouter);

// Global Error Handler for Express in Serverless
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[API Server Error]:', err);
  if (!res.headersSent) {
    res.status(500).json({
      success: false,
      message: err?.message || 'Internal server error',
    });
  }
});

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
