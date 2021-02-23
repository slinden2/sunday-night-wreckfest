/* 
Mock data for test inputs and returns
*/

import {
  IDriverSeasonRaceData,
  RaceGroup,
  IRaceCalendarEvent,
  ISeasonData,
  Driver,
  Team,
  IRaceDetails,
} from "../types";
import { IStandingRow } from "../services/standings/standingsUtils";

export const toPromise = <T>(data: T): Promise<typeof data> =>
  new Promise((resolve) => {
    resolve(data);
  });

export const toRaceCalendarEventsInput: any[] = [
  {
    seasonId: "0400",
    seasonName: "SEASON 4",
    eventId: "0401",
    isReady: "1",
    isCompleted: "1",
    isProcessed: "1",
    drawsChecked: "1",
    hasPowerLimit: "1",
    hasTeams: "1",
    date: "12.1.2020",
    trackName: "Boulder Bank Full Circuit 2 No X",
    qLaps: "6",
    raceLaps: "4",
  },
  {
    seasonId: "0400",
    seasonName: "SEASON 4",
    eventId: "0402",
    isReady: "0",
    isCompleted: "0",
    isProcessed: "0",
    drawsChecked: "0",
    hasPowerLimit: "0",
    hasTeams: "0",
    date: "19.1.2020",
    trackName: "Fire Rock Raceway Main Circuit Reverse",
    qLaps: "9",
    raceLaps: "6",
  },
];

export const toRaceCalendarEventsReturn: IRaceCalendarEvent[] = [
  {
    seasonId: "0400",
    seasonName: "SEASON 4",
    eventId: "0401",
    isReady: true,
    isCompleted: true,
    isProcessed: true,
    drawsChecked: true,
    hasPowerLimit: true,
    hasTeams: true,
    date: "2020-01-12",
    trackName: "Boulder Bank Full Circuit 2 No X",
    qLaps: 6,
    raceLaps: 4,
  },
  {
    seasonId: "0400",
    seasonName: "SEASON 4",
    eventId: "0402",
    isReady: false,
    isCompleted: false,
    isProcessed: false,
    drawsChecked: false,
    hasPowerLimit: false,
    hasTeams: false,
    date: "2020-01-19",
    trackName: "Fire Rock Raceway Main Circuit Reverse",
    qLaps: 9,
    raceLaps: 6,
  },
];

export const getDrawsRaceCal: IRaceCalendarEvent[] = toRaceCalendarEventsReturn.map(
  (event) => {
    return { ...event, isReady: true, isCompleted: true, isProcessed: false };
  }
);

export const getRaceCalendarReturn: IRaceCalendarEvent[] = [
  {
    seasonId: "0400",
    seasonName: "SEASON 4",
    eventId: "0401",
    isReady: true,
    isCompleted: true,
    isProcessed: true,
    drawsChecked: true,
    hasPowerLimit: true,
    hasTeams: true,
    date: "20200101",
    trackName: "Test Track",
    qLaps: 5,
    raceLaps: 4,
  },
  {
    seasonId: "0400",
    seasonName: "SEASON 4",
    eventId: "0402",
    isReady: true,
    isCompleted: true,
    isProcessed: true,
    drawsChecked: true,
    hasPowerLimit: true,
    hasTeams: true,
    date: "20200101",
    trackName: "Test Track",
    qLaps: 5,
    raceLaps: 4,
  },
];

export const getRaceCalendarReturnWithWrittenRes: typeof getRaceCalendarReturn = getRaceCalendarReturn.map(
  (cal) => ({ ...cal, writtenResults: "Results For Testing" })
);

export const getRaceDataInput = [
  {
    driverId: "DRI0001",
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
    driverId: "DRI0002",
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
    driverId: "DRI0001",
    driverName: "Test Driver",
    eventId: "0401",
    isReady: true,
    isProcessed: true,
    qTime: "01:01,500",
    group: RaceGroup.A,
    heatPositions: [1, 2, 3, 4, 5],
    seasonPoints: 100,
  },
  {
    driverId: "DRI0002",
    driverName: "Test Driver2",
    eventId: "0401",
    isReady: true,
    isProcessed: true,
    qTime: "01:00,500",
    group: RaceGroup.A,
    heatPositions: [2, 3, 4, 5, 6],
    seasonPoints: 95,
  },
];

export const getDrawsReturn: IDriverSeasonRaceData[] = getRaceDataReturn.map(
  (driver) => {
    return { ...driver, heatPoints: [50, 50, 50, 50, 50] };
  }
);

export const toDriverRaceDetailsReturn: IDriverSeasonRaceData[] = getRaceDataReturn.map(
  (driver) => {
    const newDriver = { ...driver };
    delete newDriver.seasonPoints;
    return newDriver;
  }
);

export const getDriverRowInput = [
  {
    driverId: "DRI0001",
    seasonId: "0400",
  },
  {
    driverId: "DRI0002",
    seasonId: "0400",
  },
  {
    driverId: "DRI0001",
    seasonId: "0500",
  },
];

export const updateRowDriverRow = {
  seasonId: "0400",
  driverId: "DRI0022",
  driverName: "Escobar",
  racesDriven: "1",
  points: "28",
  powerLimit: "",
  eventIds: "0401",
};

export const updateRowDriverRowErr = {
  seasonId: "0400",
  driverId: "DRI0022",
  driverName: "Escobar",
  racesDriven: "1",
  points: "28",
  powerLimit: "",
  eventIds: "0401;0402",
};

export const updateRowDriver: IDriverSeasonRaceData = {
  driverId: "DRI0022",
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
  driverId: "DRI0022",
  driverName: "Escobar",
  racesDriven: 2,
  points: 50,
  powerLimit: "",
  eventIds: "0401;0402",
};

export const addRaceToStandingsRaceData: IDriverSeasonRaceData[] = [
  {
    driverId: "DRI0001",
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
    driverId: "DRI0001",
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

export const toStandingRowsInput: any[] = [
  {
    seasonId: "0400",
    seasonName: "SEASON 4",
    driverId: "DRI0008",
    driverName: "Kohtupora98",
    racesDriven: "1",
    points: "80",
    powerLimit: "",
    eventIds: "0402",
  },
  {
    seasonId: "0400",
    seasonName: "SEASON 4",
    driverId: "DRI0013",
    driverName: "Mursu890",
    racesDriven: "2",
    points: "44",
    powerLimit: "",
    eventIds: "0401;0402",
  },
];

export const toStandingRowsReturn: IStandingRow[] = [
  {
    seasonId: "0400",
    seasonName: "SEASON 4",
    driverId: "DRI0008",
    driverName: "Kohtupora98",
    racesDriven: 1,
    points: 80,
    powerLimit: "",
    eventIds: ["0402"],
  },
  {
    seasonId: "0400",
    seasonName: "SEASON 4",
    driverId: "DRI0013",
    driverName: "Mursu890",
    racesDriven: 2,
    points: 44,
    powerLimit: "",
    eventIds: ["0401", "0402"],
  },
];

export const getStandingsReturn: IStandingRow[] = [
  {
    seasonId: "0400",
    driverId: "DRI0001",
    seasonName: "SEASON 4",
    driverName: "Test Driver 1",
    racesDriven: 1,
    points: 100,
    powerLimit: "C161",
    eventIds: ["0401"],
  },
  {
    seasonId: "0400",
    driverId: "DRI0002",
    seasonName: "SEASON 4",
    driverName: "Test Driver 2",
    racesDriven: 2,
    points: 180,
    powerLimit: "C161",
    eventIds: ["0401", "0402"],
  },
];

export const mergeRaceDataReturn = {
  date: "20200101",
  eventId: "0401",
  drawsChecked: true,
  hasPowerLimit: true,
  hasTeams: true,
  isCompleted: true,
  isProcessed: true,
  isReady: true,
  qLaps: 5,
  raceLaps: 4,
  seasonId: "0400",
  seasonName: "SEASON 4",
  trackName: "Test Track",
  details: [
    {
      driverId: "DRI0001",
      driverName: "Test Driver",
      eventId: "0401",
      group: "A",
      heatPositions: [1, 2, 3, 4, 5],
      isProcessed: true,
      isReady: true,
      qTime: "01:01,500",
      seasonPoints: 100,
    },
    {
      driverId: "DRI0002",
      driverName: "Test Driver2",
      eventId: "0401",
      group: "A",
      heatPositions: [2, 3, 4, 5, 6],
      isProcessed: true,
      isReady: true,
      qTime: "01:00,500",
      seasonPoints: 95,
    },
  ],
};

export const toSeasonDataInput = {
  seasonId: "0400",
  seasonName: "SEASON 4",
  description: "testDesc",
  cars: "sunrise;raiden;",
  mods: "mod1,123456;mod2,234567;",
};

export const toSeasonDataReturn: ISeasonData = {
  seasonId: "0400",
  seasonName: "SEASON 4",
  description: "<p>testDesc</p>\n",
  cars: ["sunrise", "raiden"],
  mods: [
    { name: "mod1", id: 123456 },
    { name: "mod2", id: 234567 },
  ],
};

export const mergeRaceDataReturn2: ISeasonData = {
  ...mergeRaceDataReturn,
  description: "<p>testDesc</p>\n",
  cars: ["sunrise", "raiden"],
  mods: [
    { name: "mod1", id: 123456 },
    { name: "mod2", id: 234567 },
  ],
};

export const getDrawsInput: IDriverSeasonRaceData[] = [
  {
    driverId: "DRI0004",
    driverName: "KNGS",
    eventId: "K001",
    isReady: true,
    isProcessed: false,
    qTime: "00:00,000",
    group: RaceGroup.A,
    heatPositions: [1, 1, 3, 3, 1, 2],
    drawPosition: undefined,
    heatPoints: [100, 100, 70, 70, 100, 80],
    seasonPoints: 25,
  },
  {
    driverId: "DRI0018",
    driverName: "Kustii",
    eventId: "K001",
    isReady: true,
    isProcessed: false,
    qTime: "00:00,000",
    group: RaceGroup.A,
    heatPositions: [3, 5, 7, 1, 3, 1],
    drawPosition: undefined,
    heatPoints: [70, 50, 40, 100, 70, 100],
    seasonPoints: 23,
  },
  {
    driverId: "DRI0029",
    driverName: "Rytko",
    eventId: "K001",
    isReady: true,
    isProcessed: false,
    qTime: "00:00,000",
    group: RaceGroup.A,
    heatPositions: [7, 12, 7, 10, 8],
    drawPosition: 1,
    heatPoints: [40, 15, 40, 25, 35],
    seasonPoints: 9,
  },
  {
    driverId: "DRI0009",
    driverName: "Sus1ryhmä",
    eventId: "K001",
    isReady: true,
    isProcessed: false,
    qTime: "00:00,000",
    group: RaceGroup.A,
    heatPositions: [9, 9, 13, 9, 9, 10],
    drawPosition: 2,
    heatPoints: [30, 30, 10, 30, 30, 25],
    seasonPoints: 7,
  },
];

export const getDrawsReturn2: IDriverSeasonRaceData[] = [
  {
    driverId: "DRI0009",
    driverName: "Sus1ryhmä",
    eventId: "K001",
    isReady: true,
    isProcessed: false,
    qTime: "00:00,000",
    group: RaceGroup.A,
    heatPositions: [9, 9, 13, 9, 9, 10],
    drawPosition: 2,
    heatPoints: [30, 30, 10, 30, 30, 25],
    seasonPoints: 7,
  },
  {
    driverId: "DRI0029",
    driverName: "Rytko",
    eventId: "K001",
    isReady: true,
    isProcessed: false,
    qTime: "00:00,000",
    group: RaceGroup.A,
    heatPositions: [7, 12, 7, 10, 8],
    drawPosition: 1,
    heatPoints: [40, 15, 40, 25, 35],
    seasonPoints: 9,
  },
];

export const getSeasonDataReturn: ISeasonData = {
  seasonId: "0400",
  seasonName: "Test Season",
  description: "<p>Test</p>\n",
  cars: ["Test1, Test2"],
  mods: [
    {
      name: "TestMod1",
      id: 123456,
    },
    {
      name: "TestMod2",
      id: 234567,
    },
  ],
};

export const rawDriverData = [
  { driverId: "DRI0001", driverName: "Test Driver1", team: "Team Test" },
  { driverId: "DRI0002", driverName: "Test Driver2", team: "Team Test" },
  { driverId: "DRI0003", driverName: "Test Driver3", team: "Team Test 2" },
  { driverId: "DRI0004", driverName: "Test Driver4" },
];

export const driverData: Driver[] = [
  { id: "DRI0001", name: "Test Driver1", team: "Team Test" },
  { id: "DRI0002", name: "Test Driver2", team: "Team Test" },
  { id: "DRI0003", name: "Test Driver3", team: "Team Test 2" },
  { id: "DRI0004", name: "Test Driver4" },
];

export const teamData: Team[] = [
  {
    name: "Team Test",
    driver1: "Test Driver1",
    driver2: "Test Driver2",
  },
  {
    name: "Team Test 2",
    driver1: "Test Driver3",
  },
];

export const getSingleRaceReturn: IRaceDetails = {
  seasonId: "0400",
  seasonName: "SEASON 4",
  eventId: "0401",
  isReady: true,
  isCompleted: true,
  isProcessed: true,
  drawsChecked: true,
  hasPowerLimit: true,
  hasTeams: true,
  date: "2020-01-12",
  trackName: "Boulder Bank Full Circuit 2 No X",
  qLaps: 6,
  raceLaps: 4,
  description: "<p>Test</p>\n",
  cars: ["Test1, Test2"],
  mods: [
    { name: "TestMod1", id: 123456 },
    { name: "TestMod2", id: 234567 },
  ],
  details: [
    {
      driverId: "DRI0001",
      driverName: "Test Driver",
      eventId: "0401",
      isReady: true,
      isProcessed: true,
      qTime: "01:01,500",
      group: RaceGroup.A,
      heatPositions: [1, 2, 3, 4, 5],
      seasonPoints: 100,
    },
    {
      driverId: "DRI0002",
      driverName: "Test Driver2",
      eventId: "0401",
      isReady: true,
      isProcessed: true,
      qTime: "01:00,500",
      group: RaceGroup.A,
      heatPositions: [2, 3, 4, 5, 6],
      seasonPoints: 95,
    },
  ],
};
