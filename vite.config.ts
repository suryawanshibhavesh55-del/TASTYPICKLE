import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Vite plugin to run the Vercel serverless API directly inside Vite dev server
function vercelApiDevPlugin() {
  return {
    name: 'vercel-api-dev-server',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url && req.url.startsWith('/api')) {
          try {
            const apiModule = await server.ssrLoadModule('/api/index.ts');
            const handler = apiModule.default;
            return handler(req, res);
          } catch (err) {
            console.error('[Vite API Middleware Error]:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ success: false, message: 'Serverless API Execution Error' }));
          }
        }
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vercelApiDevPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: false,
  },
});
