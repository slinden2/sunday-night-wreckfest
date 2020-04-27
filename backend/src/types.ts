export enum RaceGroup {
  A = "A",
  B = "B",
  C = "C",
}

export enum EventType {
  Season = "Season",
}

export interface IHeatPositions {
  heat1: number;
  heat2: number;
  heat3: number;
  heat4: number;
  heat5: number;
  heat6?: number;
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
  racePositions: IHeatPositions;
}
