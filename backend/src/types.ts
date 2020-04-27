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
}
