export interface IRaceCalendarEvent {
  seasonId: string;
  seasonName: string;
  eventId: string;
  isCompleted: boolean;
  date: string;
  trackName: string;
  qLaps: number;
  raceLaps: number;
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
