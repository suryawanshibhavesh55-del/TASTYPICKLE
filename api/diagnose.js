export default async function handler(req, res) {
  try {
    const mod = await import('./index.js');
    res.status(200).json({ success: true, modType: typeof mod.default });
  } catch (err) {
    res.status(200).json({ error: err.message, stack: err.stack });
  }
}

