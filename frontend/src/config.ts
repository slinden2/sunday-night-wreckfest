const baseUrl = `/api`;
const getRaceUrl = (id: string) => `/races/${id}`;
const discordLink = "https://discord.gg/byEWZKN";
const getModUrl = (id: number) =>
  `steam://openurl/https://steamcommunity.com/sharedfiles/filedetails/?id=${id}`;
const getDocTitle = (suffix: string) => `Sunday Night Wreckfest | ${suffix}`;

// eslint-disable-next-line no-undef
const ENV = process.env.NODE_ENV;

export default {
  baseUrl,
  getRaceUrl,
  discordLink,
  getModUrl,
  getDocTitle,
  ENV,
};
