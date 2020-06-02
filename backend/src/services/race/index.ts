/* 
This class handles business logic regarding race events.
The class constructor consumes the race details and calculates
points for the event etc.
*/

import { IDriverSeasonRaceData, RaceGroup } from "../../types";
import {
  heatPoints,
  seasonPoints,
  seasonPointsS1S2,
  seasonPointsKRPH,
  seasonPointsS3TT,
} from "./points";
import { DataIntegrityError } from "../../utils/errors";
import { getSumOfArrayElements } from "../../utils/misc";

class Race {
  rawData: IDriverSeasonRaceData[];

  constructor(raceData: IDriverSeasonRaceData[]) {
    this.rawData = raceData;
  }

  /* 
  Adds heatPoints array prop for all drivers. The array consists of
  number of points per heat.
  */
  private _getRaceDataWithPointsPerHeat(): IDriverSeasonRaceData[] {
    return this.rawData.map(driver => {
      return {
        ...driver,
        heatPoints: driver.heatPositions.map(pos => heatPoints[pos]),
      };
    });
  }

  /* 
  Partition rawData array of drivers into array of arrays by group.
  For example, if there are two groups A and B, the first nested 
  array shall contain the drivers of group A and the second of group B.
  */
  private _partitionDrivers(
    raceData: IDriverSeasonRaceData[]
  ): Array<IDriverSeasonRaceData[]> {
    const raceGroups = Array.from(
      new Set(raceData.map(driver => driver.group))
    );

    const dataPerRaceGroup: Array<IDriverSeasonRaceData[]> = [];

    raceGroups.forEach(rg => {
      dataPerRaceGroup.push(raceData.filter(driver => driver.group === rg));
    });

    return dataPerRaceGroup;
  }

  /* 
  Sort drivers by the total of heatPoints.
  */
  private _sortByPoints(a: IDriverSeasonRaceData, b: IDriverSeasonRaceData) {
    const aPoints = getSumOfArrayElements(a.heatPoints);
    const bPoints = getSumOfArrayElements(b.heatPoints);

    if (!aPoints || !bPoints) {
      throw new DataIntegrityError(
        `Missing heatPoints: aPoints ${aPoints}, bPoints: ${bPoints}`
      );
    }

    // In case of draw use drawPosition to sort
    if (aPoints === bPoints && a.drawPosition && b.drawPosition) {
      return a.drawPosition - b.drawPosition;
    }

    return bPoints - aPoints;
  }

  /* 
  Sort the driver _within_ their group (array) by sum of heatPoints.
  */
  private _sortGroupData(raceData: Array<IDriverSeasonRaceData[]>) {
    return raceData.map(groupData =>
      groupData.sort((a, b) => this._sortByPoints(a, b))
    );
  }

  /* 
  Get correct points object to use for the season in question and the point type.

  oldest: used only for the first two season
  medium: used fro the season in-between
  new: currently used point set
  */
  private _getSeasonPointSet() {
    const seasonId = this.rawData[0].eventId.substr(0, 2) + "00";

    const oldestPoints = ["0100", "0200"];
    const olderPoints = ["K000", "P000"];
    const oldPoints = ["0300", "S000", "U000"];

    if (oldestPoints.includes(seasonId))
      return { points: seasonPointsS1S2, type: "oldest" };
    if (olderPoints.includes(seasonId))
      return { points: seasonPointsKRPH, type: "older" };
    if (oldPoints.includes(seasonId))
      return { points: seasonPointsS3TT, type: "old" };
    else return { points: seasonPoints, type: "new" };
  }

  /* 
  Merge the group arrays together and add season points for all drivers
  based on their array index. The drivers must be sorted before this.
  */
  private _addSeasonPoints(
    raceData: Array<IDriverSeasonRaceData[]>
  ): IDriverSeasonRaceData[] {
    const mergedArray: IDriverSeasonRaceData[] = [];
    const mergedRaceData = mergedArray.concat(...raceData);

    let firstOfB = false;
    let firstOfC = false;

    const seasonPointSet = this._getSeasonPointSet();

    return mergedRaceData.map((driver, i) => {
      driver = { ...driver, seasonPoints: seasonPointSet.points[i] };

      // first of group B gets 2 extra points
      if (!firstOfB && driver.group === RaceGroup.B && driver.seasonPoints) {
        driver.seasonPoints += seasonPointSet.type === "new" ? 2 : 1;
        firstOfB = true;
      }

      // first of group C gets 1 extra points
      if (!firstOfC && driver.group === RaceGroup.C && driver.seasonPoints) {
        driver.seasonPoints += 1;
        firstOfC = true;
      }

      return driver;
    });
  }

  private _generateRaceDataWithPoints(): IDriverSeasonRaceData[] {
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

export default Race;
