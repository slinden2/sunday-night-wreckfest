export enum VideoService {
  youtube = "youtube",
  twitch = "twitch",
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
  qLaps: number;
  raceLaps: number;
  hasPowerLimit: boolean;
  videos?: VideoType[];
}

export interface ISeason {
  seasonId: string;
  seasonName: string;
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

export interface IRaceDetails extends IRaceCalendarEvent {
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
