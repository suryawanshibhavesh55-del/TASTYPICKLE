export default async function handler(req, res) {
  const results = {};
  const deps = ['express', 'cors', 'mongoose', 'razorpay', 'resend', 'jsonwebtoken', 'multer', 'cloudinary', 'bcryptjs', 'dotenv'];
  for (const dep of deps) {
    try {
      const mod = await import(dep);
      results[dep] = { success: true, keys: Object.keys(mod).slice(0, 5) };
    } catch (e) {
      results[dep] = { success: false, error: e.message };
    }
  }
  res.status(200).json(results);
}
