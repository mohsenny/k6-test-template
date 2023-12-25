import { endpoints } from '../config/index.js';
import http from 'k6/http';
import { defaultHeader } from '../http.js';
// import { logger } from '../logger.js';

export const getPosts = () => {
  const response = http.get(
    endpoints.list.jsonPlaceholderPosts.getPosts,
    {
      headers: defaultHeader,
    }
  );
  if (response.status !== 200) {
    // errorLogger('Logging in', response);
  }

  let token = JSON.parse(response.body).token;
  return token;
};
