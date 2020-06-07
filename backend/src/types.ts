export enum VideoService {
  youtube = "youtube",
  twitch = "twitch",
  twitchClip = "twitchClip",
}

export type VideoType = {
  service: VideoService;
  id: string;
};

export interface IRaceCalendarEvent {
  seasonId: string;
  seasonName: string;
  eventId: string;
  isReady: boolean;
  isCompleted: boolean;
  isProcessed: boolean;
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

export interface IDriverSeasonRaceData extends IBaseDriverRaceData {
  qTime: string;
  group: RaceGroup;
  heatPositions: Array<number>;
  heatPoints?: Array<number>;
  seasonPoints?: number;
  drawPosition?: number;
}

export interface IRaceDetails extends IRaceCalendarEvent {
  description?: string;
  cars?: string[];
  mods?: Mod[];
  details?: IDriverSeasonRaceData[];
}

export type Mod = {
  name: string;
  url: string;
};

export interface ISeasonData {
  seasonId: string;
  seasonName: string;
  description: string;
  cars?: string[];
  mods?: Mod[];
}

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

export interface IWFServerData {
  name: string;
  players: number;
  maxPlayers: number;
}
