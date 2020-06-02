"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../types");
const points_1 = require("./points");
const errors_1 = require("../../utils/errors");
const misc_1 = require("../../utils/misc");
class Race {
    constructor(raceData) {
        this.rawData = raceData;
    }
    _getRaceDataWithPointsPerHeat() {
        return this.rawData.map(driver => {
            return Object.assign(Object.assign({}, driver), { heatPoints: driver.heatPositions.map(pos => points_1.heatPoints[pos]) });
        });
    }
    _partitionDrivers(raceData) {
        const raceGroups = Array.from(new Set(raceData.map(driver => driver.group)));
        const dataPerRaceGroup = [];
        raceGroups.forEach(rg => {
            dataPerRaceGroup.push(raceData.filter(driver => driver.group === rg));
        });
        return dataPerRaceGroup;
    }
    _sortByPoints(a, b) {
        const aPoints = misc_1.getSumOfArrayElements(a.heatPoints);
        const bPoints = misc_1.getSumOfArrayElements(b.heatPoints);
        if (!aPoints || !bPoints) {
            throw new errors_1.DataIntegrityError(`Missing heatPoints: aPoints ${aPoints}, bPoints: ${bPoints}`);
        }
        if (aPoints === bPoints && a.drawPosition && b.drawPosition) {
            return a.drawPosition - b.drawPosition;
        }
        return bPoints - aPoints;
    }
    _sortGroupData(raceData) {
        return raceData.map(groupData => groupData.sort((a, b) => this._sortByPoints(a, b)));
    }
    _getSeasonPointSet() {
        const seasonId = this.rawData[0].eventId.substr(0, 2) + "00";
        const oldestPoints = ["0100", "0200"];
        const olderPoints = ["K000", "P000"];
        const oldPoints = ["0300", "S000", "U000"];
        if (oldestPoints.includes(seasonId))
            return { points: points_1.seasonPointsS1S2, type: "oldest" };
        if (olderPoints.includes(seasonId))
            return { points: points_1.seasonPointsKRPH, type: "older" };
        if (oldPoints.includes(seasonId))
            return { points: points_1.seasonPointsS3TT, type: "old" };
        else
            return { points: points_1.seasonPoints, type: "new" };
    }
    _addSeasonPoints(raceData) {
        const mergedArray = [];
        const mergedRaceData = mergedArray.concat(...raceData);
        let firstOfB = false;
        let firstOfC = false;
        const seasonPointSet = this._getSeasonPointSet();
        return mergedRaceData.map((driver, i) => {
            driver = Object.assign(Object.assign({}, driver), { seasonPoints: seasonPointSet.points[i] });
            if (!firstOfB && driver.group === types_1.RaceGroup.B && driver.seasonPoints) {
                driver.seasonPoints += seasonPointSet.type === "new" ? 2 : 1;
                firstOfB = true;
            }
            if (!firstOfC && driver.group === types_1.RaceGroup.C && driver.seasonPoints) {
                driver.seasonPoints += 1;
                firstOfC = true;
            }
            return driver;
        });
    }
    _generateRaceDataWithPoints() {
        const raceDataWithHeatPoints = this._getRaceDataWithPointsPerHeat();
        const groupedRaceData = this._partitionDrivers(raceDataWithHeatPoints);
        const sortedGroupedRaceData = this._sortGroupData(groupedRaceData);
        const finalRaceData = this._addSeasonPoints(sortedGroupedRaceData);
        return finalRaceData;
    }
    get getRaceData() {
        return this._generateRaceDataWithPoints();
    }
}
exports.default = Race;
//# sourceMappingURL=index.js.map