export const defaultHeader = {
  "content-type": "application/json",
};

export function authHeader(token) {
  return {
    "content-type": "application/json",
    // 'authorization': `Bearer ${token}`
  };
}
