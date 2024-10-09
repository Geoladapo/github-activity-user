// src/utils/activityFormatter.ts
import { GitHubEvent } from '../services/githbuService';

// Format GitHub activity for display
export function displayActivity(events: GitHubEvent[]): string[] {
  if (events.length === 0) {
    return ['No recent activity found.'];
  }

  return events.map((event) => {
    let action: string;

    switch (event.type) {
      case 'PushEvent':
        const commitCount = event.payload.commits.length;
        action = `Pushed ${commitCount} commit(s) to ${event.repo.name}`;
        break;
      case 'IssuesEvent':
        action = `${
          event.payload.action.charAt(0).toUpperCase() +
          event.payload.action.slice(1)
        } an issue in ${event.repo.name}`;
        break;
      case 'WatchEvent':
        action = `Starred ${event.repo.name}`;
        break;
      case 'ForkEvent':
        action = `Forked ${event.repo.name}`;
        break;
      case 'CreateEvent':
        action = `Created ${event.payload.ref_type} in ${event.repo.name}`;
        break;
      default:
        action = `${event.type.replace('Event', '')} in ${event.repo.name}`;
        break;
    }

    return `- ${action}`;
  });
}
