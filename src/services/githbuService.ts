import fetch from 'node-fetch';

export interface GitHubEvent {
  type: string;
  repo: {
    name: string;
  };
  payload: any;
}

export async function fetchGitHubActivity(
  username: string
): Promise<GitHubEvent[]> {
  const response = await fetch(
    `https://api.github.com/users/${username}/events`,
    {
      headers: {
        'User-Agent': 'node.js',
      },
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('User not found. Please check the username.');
    } else {
      throw new Error(`Error fetching data: ${response.status}`);
    }
  }

  return (await response.json()) as GitHubEvent[];
}
