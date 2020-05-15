export interface RaceCalendarEvent {
  seasonId: string;
  seasonName: string;
  eventId: string;
  isReady: boolean;
  isCompleted: boolean;
  isProcessed: boolean;
  hasPowerLimit: boolean;
  date: string;
  trackName: string;
  qLaps: number;
  raceLaps: number;
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
  verifyScore?: boolean;
}
