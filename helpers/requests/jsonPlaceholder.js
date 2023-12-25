import { endpoints } from "../config/index.js";
import http from "k6/http";
import { defaultHeader } from "../http.js";
// import { logger } from '../logger.js';

export const getPosts = () => {
  const response = http.get(
    endpoints.list.jsonPlaceholderPosts.getPosts,
    {
      headers: defaultHeader,
    },
    {
      tags: { my_custom_tag: "get_posts" },
    },
  );
  if (response.status !== 200) {
    // errorLogger('Logging in', response);
  }
};

export const createPost = (payload) => {
  const response = http.post(
    endpoints.list.jsonPlaceholderPosts.getPosts,
    JSON.stringify(payload),
    {
      headers: defaultHeader,
    },
    {
      tags: { my_custom_tag: "get_posts" },
    },
  );

  if (response.status !== 201) {
    console.error(`Unexpected status: ${response.status}`);
    console.error(`Response body: ${response.body}`);
    return null; // or handle accordingly
  }

  try {
    let body = JSON.parse(response.body);
    return body;
  } catch (e) {
    console.error(`Error parsing JSON: ${e.message}`);
    console.error(`Raw response body: ${response.body}`);
    return null; // or handle accordingly
  }
};
