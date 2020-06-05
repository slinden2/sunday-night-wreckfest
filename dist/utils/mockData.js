"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
exports.toPromise = (data) => new Promise(resolve => {
    resolve(data);
});
exports.toRaceCalendarEventsInput = [
    {
        seasonId: "0400",
        seasonName: "SEASON 4",
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
        seasonId: "0400",
        seasonName: "SEASON 4",
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
exports.toRaceCalendarEventsReturn = [
    {
        seasonId: "0400",
        seasonName: "SEASON 4",
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
        seasonId: "0400",
        seasonName: "SEASON 4",
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
exports.getDrawsRaceCal = exports.toRaceCalendarEventsReturn.map(event => {
    return Object.assign(Object.assign({}, event), { isReady: true, isCompleted: true, isProcessed: false });
});
exports.getRaceCalendarReturn = [
    {
        seasonId: "0400",
        seasonName: "SEASON 4",
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
        seasonId: "0400",
        seasonName: "SEASON 4",
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
exports.getRaceCalendarReturnWithWrittenRes = exports.getRaceCalendarReturn.map(cal => (Object.assign(Object.assign({}, cal), { writtenResults: "Results For Testing" })));
exports.getRaceDataInput = [
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
exports.getRaceDataReturn = [
    {
        driverId: "0001",
        driverName: "Test Driver",
        eventId: "0401",
        isReady: true,
        isProcessed: true,
        qTime: "01:01,500",
        group: types_1.RaceGroup.A,
        heatPositions: [1, 2, 3, 4, 5],
        seasonPoints: 100,
    },
    {
        driverId: "0002",
        driverName: "Test Driver2",
        eventId: "0401",
        isReady: true,
        isProcessed: true,
        qTime: "01:00,500",
        group: types_1.RaceGroup.A,
        heatPositions: [2, 3, 4, 5, 6],
        seasonPoints: 95,
    },
];
exports.getDrawsReturn = exports.getRaceDataReturn.map(driver => {
    return Object.assign(Object.assign({}, driver), { heatPoints: [50, 50, 50, 50, 50] });
});
exports.toDriverRaceDetailsReturn = exports.getRaceDataReturn.map(driver => {
    const newDriver = Object.assign({}, driver);
    delete newDriver.seasonPoints;
    return newDriver;
});
exports.getDriverRowInput = [
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
exports.updateRowDriverRow = {
    seasonId: "0400",
    driverId: "0022",
    driverName: "Escobar",
    racesDriven: "1",
    points: "28",
    powerLimit: "",
    eventIds: "0401",
};
exports.updateRowDriverRowErr = {
    seasonId: "0400",
    driverId: "0022",
    driverName: "Escobar",
    racesDriven: "1",
    points: "28",
    powerLimit: "",
    eventIds: "0401;0402",
};
exports.updateRowDriver = {
    driverId: "0022",
    driverName: "Escobar",
    eventId: "0402",
    isReady: true,
    isProcessed: false,
    qTime: "00:59,579",
    group: types_1.RaceGroup.B,
    heatPositions: [9, 9, 9, 7, 9],
    heatPoints: [30, 30, 30, 40, 30],
    seasonPoints: 22,
};
exports.updateRowReturn = {
    seasonId: "0400",
    driverId: "0022",
    driverName: "Escobar",
    racesDriven: 2,
    points: 50,
    powerLimit: "",
    eventIds: "0401;0402",
};
exports.addRaceToStandingsRaceData = [
    {
        driverId: "0001",
        driverName: "Test Driver",
        eventId: "0401",
        isReady: true,
        isProcessed: false,
        qTime: "00:59,579",
        group: types_1.RaceGroup.B,
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
        group: types_1.RaceGroup.B,
        heatPositions: [9, 9, 9, 7, 9],
        heatPoints: [30, 30, 30, 40, 30],
        seasonPoints: 22,
    },
];
exports.toStandingRowsInput = [
    {
        seasonId: "0400",
        seasonName: "SEASON 4",
        driverId: "0008",
        driverName: "Kohtupora98",
        racesDriven: "1",
        points: "80",
        powerLimit: "",
        eventIds: "0402",
    },
    {
        seasonId: "0400",
        seasonName: "SEASON 4",
        driverId: "0013",
        driverName: "Mursu890",
        racesDriven: "2",
        points: "44",
        powerLimit: "",
        eventIds: "0401;0402",
    },
];
exports.toStandingRowsReturn = [
    {
        seasonId: "0400",
        seasonName: "SEASON 4",
        driverId: "0008",
        driverName: "Kohtupora98",
        racesDriven: 1,
        points: 80,
        powerLimit: "",
        eventIds: ["0402"],
    },
    {
        seasonId: "0400",
        seasonName: "SEASON 4",
        driverId: "0013",
        driverName: "Mursu890",
        racesDriven: 2,
        points: 44,
        powerLimit: "",
        eventIds: ["0401", "0402"],
    },
];
exports.getStandingsReturn = [
    {
        seasonId: "0400",
        driverId: "0001",
        seasonName: "SEASON 4",
        driverName: "Test Driver 1",
        racesDriven: 1,
        points: 100,
        powerLimit: "C161",
        eventIds: ["0401"],
    },
    {
        seasonId: "0400",
        driverId: "0002",
        seasonName: "SEASON 4",
        driverName: "Test Driver 2",
        racesDriven: 2,
        points: 180,
        powerLimit: "C161",
        eventIds: ["0401", "0402"],
    },
];
exports.mergeRaceDataReturn = {
    date: "20200101",
    eventId: "0401",
    hasPowerLimit: true,
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
            driverId: "0001",
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
            driverId: "0002",
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
exports.toSeasonDataInput = {
    seasonId: "0400",
    seasonName: "SEASON 4",
    description: "testDesc",
    cars: "sunrise;raiden;",
    mods: "mod1,www.mod1.com;mod2,www.mod2.com;",
};
exports.toSeasonDataReturn = {
    seasonId: "0400",
    seasonName: "SEASON 4",
    description: "<p>testDesc</p>\n",
    cars: ["sunrise", "raiden"],
    mods: [
        { name: "mod1", url: "www.mod1.com" },
        { name: "mod2", url: "www.mod2.com" },
    ],
};
exports.mergeRaceDataReturn2 = Object.assign(Object.assign({}, exports.mergeRaceDataReturn), { description: "<p>testDesc</p>\n", cars: ["sunrise", "raiden"], mods: [
        { name: "mod1", url: "www.mod1.com" },
        { name: "mod2", url: "www.mod2.com" },
    ] });
exports.getDrawsInput = [
    {
        driverId: "0004",
        driverName: "KNGS",
        eventId: "K001",
        isReady: true,
        isProcessed: false,
        qTime: "00:00,000",
        group: types_1.RaceGroup.A,
        heatPositions: [1, 1, 3, 3, 1, 2],
        drawPosition: undefined,
        heatPoints: [100, 100, 70, 70, 100, 80],
        seasonPoints: 25,
    },
    {
        driverId: "0018",
        driverName: "Kustii",
        eventId: "K001",
        isReady: true,
        isProcessed: false,
        qTime: "00:00,000",
        group: types_1.RaceGroup.A,
        heatPositions: [3, 5, 7, 1, 3, 1],
        drawPosition: undefined,
        heatPoints: [70, 50, 40, 100, 70, 100],
        seasonPoints: 23,
    },
    {
        driverId: "0029",
        driverName: "Rytko",
        eventId: "K001",
        isReady: true,
        isProcessed: false,
        qTime: "00:00,000",
        group: types_1.RaceGroup.A,
        heatPositions: [7, 12, 7, 10, 8],
        drawPosition: 1,
        heatPoints: [40, 15, 40, 25, 35],
        seasonPoints: 9,
    },
    {
        driverId: "0009",
        driverName: "Sus1ryhmä",
        eventId: "K001",
        isReady: true,
        isProcessed: false,
        qTime: "00:00,000",
        group: types_1.RaceGroup.A,
        heatPositions: [9, 9, 13, 9, 9, 10],
        drawPosition: 2,
        heatPoints: [30, 30, 10, 30, 30, 25],
        seasonPoints: 7,
    },
];
exports.getDrawsReturn2 = [
    {
        driverId: "0009",
        driverName: "Sus1ryhmä",
        eventId: "K001",
        isReady: true,
        isProcessed: false,
        qTime: "00:00,000",
        group: types_1.RaceGroup.A,
        heatPositions: [9, 9, 13, 9, 9, 10],
        drawPosition: 2,
        heatPoints: [30, 30, 10, 30, 30, 25],
        seasonPoints: 7,
    },
    {
        driverId: "0029",
        driverName: "Rytko",
        eventId: "K001",
        isReady: true,
        isProcessed: false,
        qTime: "00:00,000",
        group: types_1.RaceGroup.A,
        heatPositions: [7, 12, 7, 10, 8],
        drawPosition: 1,
        heatPoints: [40, 15, 40, 25, 35],
        seasonPoints: 9,
    },
];
exports.getSeasonDataReturn = {
    seasonId: "0400",
    seasonName: "Test Season",
    description: "<p>Test</p>\n",
    cars: ["Test1, Test2"],
    mods: [
        {
            name: "TestMod1",
            url: "https://testmod1.com",
        },
        {
            name: "TestMod2",
            url: "https://testmod2.com",
        },
    ],
};
//# sourceMappingURL=mockData.js.map