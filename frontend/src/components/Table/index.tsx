/* 
Generic table component for displayng all stat tables on the site
*/

import React from "react";
import styled, { css } from "styled-components";
import { ITableHeaderMap } from "../../types";
import { styledLinkProps } from "../styledElements";

const Container = styled.div<{ marginTop: string | undefined }>`
  max-width: 100%;
  position: relative;

  ${({ marginTop }) =>
    marginTop &&
    css`
      margin-top: ${marginTop};
    `}
`;

// Allow horizontal scroll that is needed for mobile
const ScrollContainer = styled.div`
  overflow-x: auto;
`;

const STable = styled.table`
  border: 2px solid black;
  border-collapse: collapse;
  width: 100%;

  ${(props) => props.theme.media.tablet} {
    font-size: 1.2rem;
  }

  td {
    border-bottom: 2px solid black;
  }

  tr:nth-child(even) {
    background-color: ${(props) => props.theme.colors.lightgrey};
  }

  thead tr:nth-child(even) {
    background-color: ${(props) => props.theme.colors.black};
  }

  td,
  th {
    padding: 0.5rem;
  }

  thead {
    border-bottom: 2px solid ${(props) => props.theme.colors.black};
    background-color: ${(props) => props.theme.colors.black};
    color: ${(props) => props.theme.colors.white};
    text-align: left;
  }

  a {
    ${styledLinkProps}
  }
`;

const HeaderCell = styled.th<{
  alignCenter: boolean;
  width: number | undefined;
}>`
  text-align: ${(props) => (props.alignCenter ? "center" : "left")};

  ${(props) => props.theme.media.desktop} {
    width: ${(props) => (props.width ? `${props.width}px` : "auto")};
  }
`;

const TableCell = styled.td<{ alignCenter: boolean }>`
  text-align: ${(props) => (props.alignCenter ? "center" : "left")};
`;

interface Props {
  data: Array<any>;
  // Headers is an array of arrays of strings. Each header array is a row.
  // This is needed, because some headers need to be multiple rows tall.
  headers: Array<string[]>;
  headerMap: ITableHeaderMap;
  marginTop?: string;
}

const Table = ({ data, headers, headerMap, marginTop }: Props) => {
  // Combine header rows and sort them by dataIndex
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
    <Container marginTop={marginTop}>
      <ScrollContainer>
        <STable>
          <thead>
            {headers.map((headerRow, i) => (
              <tr key={i}>
                {headerRow.map((header) => {
                  const headerObj = headerMap[header];
                  return (
                    <HeaderCell
                      key={header}
                      rowSpan={headerObj.rowSpan ? headerObj.rowSpan : 1}
                      colSpan={headerObj.colSpan ? headerObj.colSpan : 1}
                      alignCenter={
                        headerObj.alignCenter ? headerObj.alignCenter : false
                      }
                      width={headerMap[header].width}
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
                {orderedHeaders.map((col) => {
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
