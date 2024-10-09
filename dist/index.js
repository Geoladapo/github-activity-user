var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import express from 'express';
import { fetchGitHubActivity } from './services/githbuService.js';
import { displayActivity } from './utils/activityFormatter.js';
const app = express();
const port = 5000;
app.get('/github-activity/:username', (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    try {
      const events = yield fetchGitHubActivity(username);
      const activity = displayActivity(events);
      res.status(200).json({ username, activity });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
