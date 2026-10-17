export default async function handler(req: any, res: any) {
  try {
    const appModule = await import('../server/index');
    res.status(200).json({ success: true, message: 'Loaded server/index successfully!' });
  } catch (err: any) {
    res.status(200).json({
      success: false,
      errorName: err?.name,
      errorMessage: err?.message,
      errorStack: err?.stack,
    });
  }
}

