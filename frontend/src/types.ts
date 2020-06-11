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
  link: string;
  isCompleted: boolean;
  date: string;
  trackName: string;
  trackName2?: string;
  qLaps: number;
  raceLaps: number;
  hasPowerLimit: boolean;
  videos?: VideoType[];
  writtenResults?: string;
}

export interface ISeason {
  seasonId: string;
  seasonName: string;
  isCompleted: boolean;
  events: [Omit<IRaceCalendarEvent, "seasonId" | "seasonName">];
}

export interface ISeasonHash {
  [seasonId: string]: ISeason;
}

export interface INavItem {
  title: string;
  url: string;
  external?: boolean;
}

export interface IStandingRow {
  seasonId: string;
  seasonName: string;
  driverId: string;
  driverName: string;
  racesDriven: number;
  points: number;
  drawPosition?: number;
  powerLimit?: string;
}

export enum RaceGroup {
  A = "A",
  B = "B",
  C = "C",
}

export interface IBaseDriverRaceData {
  driverId: string;
  driverName: string;
  eventId: string;
}

export interface IDriverSeasonRaceData extends IBaseDriverRaceData {
  qTime: string;
  group: RaceGroup;
  heatPositions: Array<number>;
  heatPoints: Array<number>;
  seasonPoints: number;
  verifyScore?: boolean;
}

export type Mod = {
  name: string;
  id: number;
};

export interface IRaceDetails extends IRaceCalendarEvent {
  description?: string;
  cars?: string[];
  mods: Mod[];
  details: IDriverSeasonRaceData[];
}

export interface ITableHeaderMap {
  [field: string]: {
    title: string;
    rowSpan?: number;
    colSpan?: number;
    dataIndex?: number;
    alignCenter?: boolean;
  };
}

export interface IWFServerData {
  name: string;
  players: number;
  maxPlayers: number;
}

export interface Team {
  name: string;
  driver1: string;
  driver2?: string;
}
