import express, { Request, Response } from 'express';
import { fetchGitHubActivity } from './services/githbuService';
import { displayActivity } from './utils/activityFormatter';

const app = express();
const port = 5000;

app.get('/github-activity/:username', async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const events = await fetchGitHubActivity(username);
    const activity = displayActivity(events);
    res.status(200).json({ username, activity });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
