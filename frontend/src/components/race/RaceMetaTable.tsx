import React from "react";
import styled from "styled-components";

import { IRaceDetails } from "../../types";
import { styledLinkProps } from "../styledElements";
import config from "../../config";

const EventTable = styled.table`
  border: 2px solid black;
  border-collapse: collapse;
  text-align: left;

  ${props => props.theme.media.tablet} {
    font-size: 1.2rem;
  }

  td,
  th {
    border-bottom: 2px solid black;
    padding: 0.5rem 2rem 0.5rem 2rem;
  }

  th {
    background-color: ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.white};
  }

  a {
    ${styledLinkProps}
    margin-right: 0.5rem;
  }
`;

interface Props {
  data: IRaceDetails;
}

const RaceMetaTable = ({ data }: Props) => {
  const trackText = data.trackName2 ? "1. rata" : "Rata";

  const qLapsText = data.trackName2
    ? "1. kilpailukierrokset"
    : "Aika-ajokierrokset";
  const raceLapsText = data.trackName2
    ? "2. kilpailukierrokset"
    : "Kilpailukierroset";

  return (
    <EventTable>
      <tbody>
        <tr>
          <th>Päivämäärä</th>
          <td>{data.date}</td>
        </tr>
        <tr>
          <th>{trackText}</th>
          <td>{data.trackName}</td>
        </tr>
        {data.trackName2 && (
          <tr>
            <th>2. rata</th>
            <td>{data.trackName2}</td>
          </tr>
        )}
        {data.qLaps > 0 && (
          <tr>
            <th>{qLapsText}</th>
            <td>{data.qLaps}</td>
          </tr>
        )}
        <tr>
          <th>{raceLapsText}</th>
          <td>{data.raceLaps}</td>
        </tr>
        {data.cars && (
          <tr>
            <th>Autot</th>
            <td>{data.cars.join(", ")}</td>
          </tr>
        )}
        {data.hasPowerLimit && (
          <tr>
            <th>Tehoraja</th>
            <td>X</td>
          </tr>
        )}
        {data.mods && (
          <tr>
            <th>Modit</th>
            <td>
              {data.mods.map(mod => (
                <a
                  key={mod.name}
                  target="_black"
                  rel="noopener noreferrer"
                  href={config.getModUrl(mod.id)}
                >
                  <span>{mod.name}</span>
                </a>
              ))}
            </td>
          </tr>
        )}
      </tbody>
    </EventTable>
  );
};

export default RaceMetaTable;
