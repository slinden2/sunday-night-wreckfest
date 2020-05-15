import React from "react";

interface Props {
  options: Array<any>;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const Dropdown = ({ options, selected, setSelected }: Props) => {
  return (
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
  );
};

export default Dropdown;
