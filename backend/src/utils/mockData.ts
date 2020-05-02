import { IDriverSeasonRaceData, RaceGroup, RaceCalendarEvent } from "../types";

export const toPromise = <T>(data: T): Promise<typeof data> =>
  new Promise(resolve => {
    resolve(data);
  });

export const toRaceCalendarEventsInput: any[] = [
  {
    eventId: "0401",
    isReady: "1",
    isCompleted: "1",
    isProcessed: "1",
    hasPowerLimit: "1",
    date: "12.1.2020",
    trackName: "Boulder Bank Full Circuit 2 No X",
    qLaps: "6",
    raceLaps: "4",
  },
  {
    eventId: "0402",
    isReady: "0",
    isCompleted: "0",
    isProcessed: "0",
    hasPowerLimit: "0",
    date: "19.1.2020",
    trackName: "Fire Rock Raceway Main Circuit Reverse",
    qLaps: "9",
    raceLaps: "6",
  },
];

export const toRaceCalendarEventsReturn: RaceCalendarEvent[] = [
  {
    eventId: "0401",
    isReady: true,
    isCompleted: true,
    isProcessed: true,
    hasPowerLimit: true,
    date: "2020-01-12",
    trackName: "Boulder Bank Full Circuit 2 No X",
    qLaps: 6,
    raceLaps: 4,
  },
  {
    eventId: "0402",
    isReady: false,
    isCompleted: false,
    isProcessed: false,
    hasPowerLimit: false,
    date: "2020-01-19",
    trackName: "Fire Rock Raceway Main Circuit Reverse",
    qLaps: 9,
    raceLaps: 6,
  },
];

export const getRaceCalendarReturn: RaceCalendarEvent[] = [
  {
    eventId: "0401",
    isReady: true,
    isCompleted: true,
    isProcessed: true,
    hasPowerLimit: true,
    date: "20200101",
    trackName: "Test Track",
    qLaps: 5,
    raceLaps: 4,
  },
  {
    eventId: "0402",
    isReady: true,
    isCompleted: true,
    isProcessed: true,
    hasPowerLimit: true,
    date: "20200101",
    trackName: "Test Track",
    qLaps: 5,
    raceLaps: 4,
  },
];

export const getRaceDataInput = [
  {
    driverId: "0001",
    driverName: "Test Driver",
    eventId: "0401",
    isReady: "1",
    isProcessed: "1",
    qTime: "01:01,500",
    group: "A",
    posHeat1: "1",
    posHeat2: "2",
    posHeat3: "3",
    posHeat4: "4",
    posHeat5: "5",
  },
  {
    driverId: "0002",
    driverName: "Test Driver2",
    eventId: "0401",
    isReady: "1",
    isProcessed: "1",
    qTime: "01:00,500",
    group: "A",
    posHeat1: "2",
    posHeat2: "3",
    posHeat3: "4",
    posHeat4: "5",
    posHeat5: "6",
  },
];

export const getRaceDataReturn: IDriverSeasonRaceData[] = [
  {
    driverId: "0001",
    driverName: "Test Driver",
    eventId: "0401",
    isReady: true,
    isProcessed: true,
    qTime: "01:01,500",
    group: RaceGroup.A,
    heatPositions: [1, 2, 3, 4, 5],
  },
  {
    driverId: "0002",
    driverName: "Test Driver2",
    eventId: "0401",
    isReady: true,
    isProcessed: true,
    qTime: "01:00,500",
    group: RaceGroup.A,
    heatPositions: [2, 3, 4, 5, 6],
  },
];

export const getDriverRowInput = [
  {
    driverId: "0001",
    seasonId: "0400",
  },
  {
    driverId: "0002",
    seasonId: "0400",
  },
  {
    driverId: "0001",
    seasonId: "0500",
  },
];

export const updateRowDriverRow = {
  seasonId: "0400",
  driverId: "0022",
  driverName: "Escobar",
  racesDriven: "1",
  points: "28",
  powerLimit: "",
  eventIds: "0401",
};

export const updateRowDriverRowErr = {
  seasonId: "0400",
  driverId: "0022",
  driverName: "Escobar",
  racesDriven: "1",
  points: "28",
  powerLimit: "",
  eventIds: "0401;0402",
};

export const updateRowDriver: IDriverSeasonRaceData = {
  driverId: "0022",
  driverName: "Escobar",
  eventId: "0402",
  isReady: true,
  isProcessed: false,
  qTime: "00:59,579",
  group: RaceGroup.B,
  heatPositions: [9, 9, 9, 7, 9],
  heatPoints: [30, 30, 30, 40, 30],
  seasonPoints: 22,
};

export const updateRowReturn = {
  seasonId: "0400",
  driverId: "0022",
  driverName: "Escobar",
  racesDriven: 2,
  points: 50,
  powerLimit: "",
  eventIds: "0401;0402",
};

export const addRaceToStandingsRaceData: IDriverSeasonRaceData[] = [
  {
    driverId: "0001",
    driverName: "Test Driver",
    eventId: "0401",
    isReady: true,
    isProcessed: false,
    qTime: "00:59,579",
    group: RaceGroup.B,
    heatPositions: [9, 9, 9, 7, 9],
    heatPoints: [30, 30, 30, 40, 30],
    seasonPoints: 22,
  },
  {
    driverId: "0001",
    driverName: "Test Driver",
    eventId: "0401",
    isReady: true,
    isProcessed: false,
    qTime: "00:59,579",
    group: RaceGroup.B,
    heatPositions: [9, 9, 9, 7, 9],
    heatPoints: [30, 30, 30, 40, 30],
    seasonPoints: 22,
  },
];
