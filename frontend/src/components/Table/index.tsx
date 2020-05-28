import React from "react";
import styled from "styled-components";
import { ITableHeaderMap } from "../../types";

const Container = styled.div`
  max-width: 100%;
  position: relative;
`;

const ScrollContainer = styled.div`
  overflow-x: auto;
`;

const STable = styled.table`
  border: 2px solid black;
  border-collapse: collapse;
  width: 100%;

  ${props => props.theme.media.tablet} {
    font-size: 1.2rem;
  }

  td {
    border-bottom: 2px solid black;
  }

  td,
  th {
    padding: 0.5rem;
  }

  thead {
    border-bottom: 2px solid ${props => props.theme.colors.black};
    background-color: ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.white};
    text-align: left;
  }

  a {
    text-decoration: underline;
    color: inherit;
    display: inline-block;
    position: relative;

    &::before {
      display: block;
      content: "";
      width: 100%;
      height: 4px;
      background-color: ${props => props.theme.colors.yellow};
      position: absolute;
      bottom: -2px;
      transform: rotate(1.6deg);
    }

    &:hover::before {
      transform: scaleX(1.1) rotate(1.6deg);
    }
  }
`;

const HeaderCell = styled.th<{ alignCenter: boolean }>`
  text-align: ${props => (props.alignCenter ? "center" : "left")};
`;

const TableCell = styled.td<{ alignCenter: boolean }>`
  text-align: ${props => (props.alignCenter ? "center" : "left")};
`;

interface Props {
  data: Array<any>;
  headers: Array<string[]>;
  headerMap: ITableHeaderMap;
}

const Table = ({ data, headers, headerMap }: Props) => {
  const orderedHeaders = headers
    .reduce((acc, cur) => {
      const combinedHeaders = [...acc, ...cur];
      return combinedHeaders;
    }, [])
    .sort((a: keyof typeof headerMap, b: keyof typeof headerMap) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return headerMap[a].dataIndex! - headerMap[b].dataIndex!;
    })
    .filter(
      (header: keyof typeof headerMap) =>
        headerMap[header].dataIndex !== undefined
    );

  return (
    <Container>
      <ScrollContainer>
        <STable>
          <thead>
            {headers.map((headerRow, i) => (
              <tr key={i}>
                {headerRow.map(header => {
                  const headerObj = headerMap[header];
                  return (
                    <HeaderCell
                      key={header}
                      rowSpan={headerObj.rowSpan ? headerObj.rowSpan : 1}
                      colSpan={headerObj.colSpan ? headerObj.colSpan : 1}
                      alignCenter={
                        headerObj.alignCenter ? headerObj.alignCenter : false
                      }
                    >
                      {headerObj.title}
                    </HeaderCell>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {orderedHeaders.map(col => {
                  const alignCenter = headerMap[col].alignCenter ? true : false;
                  return (
                    <TableCell key={col} alignCenter={alignCenter}>
                      {row[col]}
                    </TableCell>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </STable>
      </ScrollContainer>
    </Container>
  );
};

export default Table;
