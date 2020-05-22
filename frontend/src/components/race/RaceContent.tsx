import React from "react";
import { IRaceDetails, VideoService } from "../../types";
import Table from "../Table";
import { convertTimeToSecs } from "../../utils";

interface Props {
  data: IRaceDetails;
}

const qHeaders = ["driverName", "qTime", "group"];

const qHeaderMap = {
  driverName: "Kuljettaja",
  qTime: "Aika",
  group: "Lohko",
};

const raceHeaders = [
  "driverName",
  "seasonPoints",
  "group",
  "heatPositions",
  "heatPoints",
];

const raceHeaderMap = {
  driverName: "Kuljettaja",
  seasonPoints: "P",
  group: "L",
  heatPositions: "Lähtötulokset",
  heatPoints: "Lähtöpisteet",
};

const RaceContent = ({ data }: Props) => {
  const qDetails = data.details.sort((a, b) => {
    const aTime = convertTimeToSecs(a.qTime);
    const bTime = convertTimeToSecs(b.qTime);
    return aTime - bTime;
  });

  const raceDetails = data.details
    .map(driver => ({
      ...driver,
      heatPoints: driver.heatPoints?.join(", "),
      heatPositions: driver.heatPositions?.join(", "),
    }))
    .sort((a, b) => b.seasonPoints - a.seasonPoints);

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>Päivä</td>
            <td>{data.date}</td>
          </tr>
          <tr>
            <td>Aika-ajokierrokset</td>
            <td>{data.qLaps}</td>
          </tr>
          <tr>
            <td>Kilpailukierrokset</td>
            <td>{data.raceLaps}</td>
          </tr>
          <tr>
            <td>Tehoraja</td>
            <td>{data.hasPowerLimit ? "X" : ""}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <h2>Aika-ajotulokset</h2>
        <Table data={qDetails} headers={qHeaders} headerMap={qHeaderMap} />
      </div>
      <div>
        <h2>Kilpailutulokset</h2>
        <Table
          data={raceDetails}
          headers={raceHeaders}
          headerMap={raceHeaderMap}
        />
      </div>
      {data.videos && (
        <div>
          {data.videos.map(video => {
            if (video.service === VideoService.twitch) {
              return (
                <iframe
                  key={video.id}
                  src={`https://player.twitch.tv/?autoplay=false&video=v${video.id}`}
                  height="378"
                  width="620"
                  scrolling="no"
                ></iframe>
              );
            }

            if (video.service === VideoService.youtube) {
              return (
                <iframe
                  key={video.id}
                  width="620"
                  height="378"
                  src={`https://www.youtube.com/embed/${video.id}`}
                ></iframe>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default RaceContent;
