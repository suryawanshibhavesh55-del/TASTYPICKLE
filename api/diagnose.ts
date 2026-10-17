import fs from 'fs';

export default async function handler(req: any, res: any) {
  try {
    const filesInApi = fs.existsSync('/var/task/api') ? fs.readdirSync('/var/task/api') : [];
    res.status(200).json({ success: true, filesInApi });
  } catch (err: any) {
    res.status(200).json({ error: err?.message });
  }
}

