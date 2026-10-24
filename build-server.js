import esbuild from 'esbuild';

async function build() {
  console.log('[build-server] Bundling serverless functions directly from server/index.ts...');
  await esbuild.build({
    entryPoints: {
      'index': 'server/index.ts',
      '[...path]': 'server/index.ts',
    },
    bundle: true,
    platform: 'node',
    target: 'node20',
    format: 'esm',
    packages: 'external',
    outdir: 'api',
  });
  console.log('[build-server] Serverless functions bundled successfully into api/index.js and api/[...path].js');
}

build().catch((err) => {
  console.error('[build-server] Build failed:', err);
  process.exit(1);
});
