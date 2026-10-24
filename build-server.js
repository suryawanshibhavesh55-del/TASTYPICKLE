import esbuild from 'esbuild';

async function build() {
  console.log('[build-server] Bundling serverless functions for all API routes...');
  await esbuild.build({
    entryPoints: {
      'index': 'server/index.ts',
      '[...path]': 'server/index.ts',
      'payment/[...path]': 'server/index.ts',
      'admin/[...path]': 'server/index.ts',
      'orders/[...path]': 'server/index.ts',
      'customer/[...path]': 'server/index.ts',
      'customers/[...path]': 'server/index.ts',
      'products/[...path]': 'server/index.ts',
    },
    bundle: true,
    platform: 'node',
    target: 'node20',
    format: 'esm',
    packages: 'external',
    outdir: 'api',
  });
  console.log('[build-server] All serverless function routes bundled successfully.');
}

build().catch((err) => {
  console.error('[build-server] Build failed:', err);
  process.exit(1);
});
