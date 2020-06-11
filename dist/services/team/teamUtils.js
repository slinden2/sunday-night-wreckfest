"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
exports.toDriver = (rawRows) => {
    const cleanRows = [];
    rawRows.forEach(row => {
        const driver = Object.assign({ id: helpers_1.parseDriverId(row.driverId), name: helpers_1.parseString(row.driverName, "driverName") }, (row.team ? { team: helpers_1.parseString(row.team, "team") } : null));
        cleanRows.push(driver);
    });
    return cleanRows;
};
exports.extractTeamsFromDrivers = (drivers) => {
    const driversPerTeam = drivers.reduce((acc, cur) => {
        if (!cur.team)
            return acc;
        const existingTeam = acc.find(team => team.name === cur.team);
        if (existingTeam) {
            existingTeam.driver2 = cur.name;
        }
        else {
            acc.push({
                name: cur.team,
                driver1: cur.name,
            });
        }
        return acc;
    }, []);
    return driversPerTeam;
};
//# sourceMappingURL=teamUtils.js.map