const baseUrl = `/api`;
const getRaceUrl = (id: string) => `/races/${id}`;
const discordLink = "https://discord.gg/byEWZKN";
const getModUrl = (id: number) =>
  `https://steamcommunity.com/sharedfiles/filedetails/?id=${id}`;
const getDocTitle = (suffix: string) => `Sunday Night Wreckfest | ${suffix}`;

export default {
  baseUrl,
  getRaceUrl,
  discordLink,
  getModUrl,
  getDocTitle,
};
