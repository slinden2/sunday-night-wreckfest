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
}

export interface IStandingRow {
  seasonId: string;
  seasonName: string;
  driverId: string;
  driverName: string;
  racesDriven: number;
  points: number;
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
