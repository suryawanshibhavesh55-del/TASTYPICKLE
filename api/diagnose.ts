import fs from 'fs';

export default async function handler(req: any, res: any) {
  try {
    const varTask = '/var/task';
    const filesInVarTask = fs.existsSync(varTask) ? fs.readdirSync(varTask) : [];
    const serverExists = fs.existsSync('/var/task/server');
    const filesInServer = serverExists ? fs.readdirSync('/var/task/server') : [];

    res.status(200).json({
      success: true,
      filesInVarTask,
      serverExists,
      filesInServer,
    });
  } catch (err: any) {
    res.status(200).json({ error: err?.message });
  }
}

