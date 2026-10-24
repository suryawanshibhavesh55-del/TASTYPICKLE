export default async function handler(req, res) {
  try {
    const mod = await import('./index.js');
    res.status(200).json({
      success: true,
      hasDefault: !!mod.default,
      type: typeof mod.default,
      keys: Object.keys(mod.default || {}),
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: err?.message,
      stack: err?.stack,
    });
  }
}
