const port = 3001;
const baseUrl = `http://localhost:${port}/api`;
const getRaceUrl = (id: string) => `/races/${id}`;

export default {
  port,
  baseUrl,
  getRaceUrl,
};
