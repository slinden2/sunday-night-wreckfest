import React from "react";
import styled from "styled-components";

import arrow from "../assets/arrow.png";

const Container = styled.div`
  margin-top: 3rem;
  font-size: 1.5rem;
  padding: 10px 8px 10px 14px;
  background: #fff;
  border: 1px solid ${props => props.theme.colors.black};
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  width: 100%;
  max-width: 300px;

  .search-categories {
    width: 110%;
    background: url(${arrow}) no-repeat;
    background-size: 20px;
    background-position: 90% center;
  }

  select {
    background: transparent;
    line-height: 1;
    border: 0;
    padding: 0;
    border-radius: 0;
    width: 110%;
    position: relative;
    z-index: 10;
    font-size: 1em;
    cursor: pointer;
  }
`;

interface Props {
  options: Array<any>;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const Dropdown = ({ options, selected, setSelected }: Props) => {
  return (
    <Container>
      <div className="search-categories">
        <select
          value={selected}
          onChange={event => setSelected(event.target.value)}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.content}
            </option>
          ))}
        </select>
      </div>
    </Container>
  );
};

export default Dropdown;
