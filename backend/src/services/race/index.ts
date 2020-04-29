/* 
This class handles business logic regarding race events.
The class constructor consumes the race details and calculates
points for the event etc.
*/

import { IDriverSeasonRaceData, RaceGroup } from "../../types";
import { heatPoints, seasonPoints } from "./points";
import { DataIntegrityError } from "../../utils/errors";

class Race {
  raceData: IDriverSeasonRaceData[];
  dataPerRaceGroup: Array<IDriverSeasonRaceData[]> = [];
  orderedRaceData: IDriverSeasonRaceData[] = [];

  constructor(raceData: IDriverSeasonRaceData[]) {
    this.raceData = raceData;
    this._generatePointsPerHeat();
    this._partitionDrivers();
    this._sortGroupData();
    this._calculateSeasonPoints();
  }

  private _generatePointsPerHeat(): void {
    this.raceData.forEach(driver => {
      driver.heatPoints = driver.heatPositions.map(pos => heatPoints[pos]);
    });
  }

  private _partitionDrivers(): void {
    const raceGroups = Array.from(
      new Set(this.raceData.map(driver => driver.group))
    );

    raceGroups.forEach(rg => {
      this.dataPerRaceGroup.push(
        this.raceData.filter(driver => driver.group === rg)
      );
    });
  }

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

  private _sortGroupData(): void {
    this.dataPerRaceGroup.forEach(groupData => {
      groupData.sort(this._sortByPoints);
    });
  }

  private _calculateSeasonPoints(): void {
    const mergedArray: IDriverSeasonRaceData[] = [];
    this.orderedRaceData = mergedArray.concat(...this.dataPerRaceGroup);

    let firstOfB: boolean = false;
    let firstOfC: boolean = false;
    this.orderedRaceData.forEach((driver, i) => {
      driver.seasonPoints = seasonPoints[i];

      // first of group B gets 2 extra points
      if (!firstOfB && driver.group === RaceGroup.B) {
        driver.seasonPoints += 2;
        firstOfB = true;
      }

      // first of group C gets 1 extra points
      if (!firstOfC && driver.group === RaceGroup.C) {
        driver.seasonPoints += 1;
        firstOfC = true;
      }
    });
  }

  get getRaceData() {
    return this.orderedRaceData;
  }
}

export default Race;
