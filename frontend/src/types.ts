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
  // With external React Router link can be bypassed and
  // url can be anything
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
    // Visible column title
    title: string;
    // rowSpan indicates how many rows does a header take. If there are subheaders
    // present on the table, the cells that have no subheader must have rowSpan 2 for example.
    rowSpan?: number;
    // colSpan defines how many subheaders does a header have.
    colSpan?: number;
    // dataIndex is the horizontal index of the data on the row. If a column has
    // colspan greater than 1, it must not have a dataIndex. dataIndex indicates
    // the column where the data goes. If a columns colspan is 2, it means that it
    // has two subcolumns under it and those headers must be indexed.
    dataIndex?: number;
    // Possibility to center align cell contents
    alignCenter?: boolean;
    // Possibility to give fixed width for a column
    width?: number;
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
  logoUrl?: string;
}

export interface Info {
  id: string;
  text: string;
}
