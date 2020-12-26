// Supported video services needed for parsing video id's/slugs from the DB.
export enum VideoService {
  youtube = "youtube",
  tubelist = "tubelist",
  twitch = "twitch",
  twitchClip = "twitchClip",
}

export type VideoType = {
  service: VideoService;
  id: string;
};

// Type of raceCalendar rows
export interface IRaceCalendarEvent {
  seasonId: string;
  seasonName: string;
  eventId: string;
  isReady: boolean;
  isCompleted: boolean;
  isProcessed: boolean;
  drawsChecked: boolean;
  hasPowerLimit: boolean;
  date: string;
  trackName: string;
  trackName2?: string;
  qLaps: number;
  raceLaps: number;
  videos?: VideoType[];
  writtenResults?: string;
}

export enum RaceGroup {
  A = "A",
  B = "B",
  C = "C",
}

export enum EventType {
  Season = "Season",
}

export interface IBaseDriverRaceData {
  driverId: string;
  driverName: string;
  eventId: string;
  isReady: boolean;
  isProcessed: boolean;
}

// Type for eventDetails row
export interface IDriverSeasonRaceData extends IBaseDriverRaceData {
  qTime: string;
  group: RaceGroup;
  heatPositions: Array<number>;
  heatPoints?: Array<number>;
  seasonPoints?: number;
  drawPosition?: number;
}

// Type for a single race. Used to display data on the race specific page.
export interface IRaceDetails extends IRaceCalendarEvent {
  description?: string;
  cars?: string[];
  mods?: Mod[];
  details?: IDriverSeasonRaceData[];
}

// Wreckfest mod type.
export type Mod = {
  name: string;
  id: number;
};

export interface ISeasonData {
  seasonId: string;
  seasonName: string;
  description: string;
  cars?: string[];
  mods?: Mod[];
}

// Data acquired from the Steam API.
// The API response is an array of this type.
export interface IWFServerDataRaw {
  addr: string;
  gameport: number;
  steamid: string;
  name: string;
  appid: number;
  gamedir: string;
  version: string;
  product: string;
  region: number;
  players: number;
  max_players: number;
  bots: number;
  map: string;
  secure: boolean;
  dedicated: boolean;
  os: string;
  gametype: string;
}

// Prettified server data type for usage on site
export interface IWFServerData {
  name: string;
  players: number;
  maxPlayers: number;
}

export interface Driver {
  id: string;
  name: string;
  team?: string;
  teamLogoUrl?: string;
}

export interface Team {
  name: string;
  driver1: string;
  driver2?: string;
  logoUrl?: string;
}

export interface Info {
  id: string;
  text: string;
}
