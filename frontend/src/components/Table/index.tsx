import React from "react";

interface Props {
  data: Array<any>;
  headers: string[];
  headerMap: {
    [field: string]: string;
  };
}

const Table = ({ data, headers, headerMap }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header}>{headerMap[header]}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {headers.map(col => (
              <td key={col}>{row[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
