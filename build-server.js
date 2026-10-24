import esbuild from 'esbuild';

async function build() {
  console.log('[build-server] Bundling explicit serverless endpoints for all API routes...');
  await esbuild.build({
    entryPoints: {
      'index': 'server/index.ts',
      'health': 'server/index.ts',
      'payment/config': 'server/index.ts',
      'payment/create-order': 'server/index.ts',
      'payment/verify': 'server/index.ts',
      'payment/webhook': 'server/index.ts',
      'customer/capture': 'server/index.ts',
      'customer/sync-cart': 'server/index.ts',
      'customer/activity': 'server/index.ts',
      'customers': 'server/index.ts',
      'products': 'server/index.ts',
      'orders': 'server/index.ts',
      'admin/login': 'server/index.ts',
      'admin/me': 'server/index.ts',
      'admin/dashboard': 'server/index.ts',
      'admin/products': 'server/index.ts',
      'admin/orders': 'server/index.ts',
      'admin/customers': 'server/index.ts',
    },
    bundle: true,
    platform: 'node',
    target: 'node20',
    format: 'esm',
    packages: 'external',
    outdir: 'api',
  });
  console.log('[build-server] All explicit serverless function endpoints generated successfully.');
}

build().catch((err) => {
  console.error('[build-server] Build failed:', err);
  process.exit(1);
});
