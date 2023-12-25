import { options } from "./configure.js";

export const list = {
  postmanEcho: {
    getPostmanEcho: `${options.host}/get`,
    postPostmanEcho: `${options.host}/post`,
  },
  jsonPlaceholderPosts: {
    getPosts: `${options.host}/posts`,
    createPosts: `${options.host}/posts`,
  },
};
