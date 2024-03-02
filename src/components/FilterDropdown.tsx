import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const FilterDropdown = ({ value, onChange }: any) => {
  const handleFilterChange = (e: any) => {
    onChange(e.target.value);
  };

  return (
    <Select variant="standard" value={value} onChange={handleFilterChange}>
      <MenuItem value="list">List View</MenuItem>
      <MenuItem value="cards">Card View</MenuItem>
    </Select>
  );
};

export default FilterDropdown;
