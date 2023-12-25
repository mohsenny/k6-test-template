export const loads = {
  performance: {
    getPostmanEcho: [
      { target: 5, duration: "5s" },
      { target: 20, duration: "5s" },
      { target: 5, duration: "5s" },
      { target: 20, duration: "5s" },
      { target: 0, duration: "5s" },
    ],
    jsonPlaceholder: {
      getPosts: [
        { target: 5, duration: "20s" },
        { target: 5, duration: "10s" },
        { target: 5, duration: "10s" },
      ],
      createPosts: [
        { target: 5, duration: "20s" },
        { target: 5, duration: "10s" },
        { target: 5, duration: "10s" },
      ],
    },
  },
  sanity: {
    getPostmanEcho: [{ target: 1, duration: "5s" }],
    jsonPlaceholder: {
      getPosts: [{ target: 1, duration: "5s" }],
      createPosts: [{ target: 1, duration: "5s" }],
    },
  },
};

export function get(env) {
  return loads[env] || loads.sanity;
}
