/* 
This class handles business logic regarding race events.
The class constructor consumes the race details and calculates
points for the event etc.
*/

import { IDriverSeasonRaceData, RaceGroup } from "../../types";
import { heatPoints, seasonPoints } from "./points";
import { DataIntegrityError } from "../../utils/errors";

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
    const aPoints = a.heatPoints?.reduce((acc, cur) => acc + cur);
    const bPoints = b.heatPoints?.reduce((acc, cur) => acc + cur);

    if (!aPoints || !bPoints) {
      throw new DataIntegrityError(
        `Missing heatPoints: aPoints ${aPoints}, bPoints: ${bPoints}`
      );
    }

    return bPoints - aPoints;
  }

  /* 
  Sort the driver _within_ their group (array) by sum of heatPoints.
  */
  private _sortGroupData(raceData: Array<IDriverSeasonRaceData[]>) {
    return raceData.map(groupData => groupData.sort(this._sortByPoints));
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

    return mergedRaceData.map((driver, i) => {
      driver = { ...driver, seasonPoints: seasonPoints[i] };

      // first of group B gets 2 extra points
      if (!firstOfB && driver.group === RaceGroup.B && driver.seasonPoints) {
        driver.seasonPoints += 2;
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
