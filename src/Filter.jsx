import React, { useState } from "react";
import { Checkbox, Menu, Dropdown, Input } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";

import { mocks } from "../mocks";

const generateTemplate = originalArray =>
  originalArray.map(item => ({
    key: Math.random(),
    text: item,
    value: item
  }));

const perspectives = generateTemplate([
  ...new Set(mocks.map(mock => mock.kpiPerspective))
]);

const targetTypes = generateTemplate([
  "Date",
  "Number",
  "Text",
  "Percentage",
  "Day",
  "Currency"
]);

const dropDownOptions = {
  kpiPerspective: perspectives,
  kpiTargetType: targetTypes
};

const Filter = props => {
  const [currentItem, setCurrentItem] = useState("");
  const [filters, setFilters] = useState({
    date: {
      startDate: "",
      endDate: ""
    },
    kpiPerspective: "",
    kpiWeight: "",
    kpiTargetType: ""
  });


  const handleChecked = (...args) => {
    const [event, data, filter] = args;
    if (data.checked) {
      return setCurrentItem(filter);
    }
    return setCurrentItem("");
  };

  const handleDateChange = (...args) => {
    const [event, data, filter] = args;
    const newObj = {
      ...filters,
      date: {
        ...filters.date,
        [filter]: data.value
      }
    };
    setFilters(newObj);
  };

  const handleGeneralChange = (...args) => {
    const [event, data, filter] = args;
    const newObj = {
      ...filters,
      [filter]: data.value
    };
    console.log(newObj, 'before state update');
    setFilters(newObj);
  };

  const showOptions = filter => {
    switch (filter) {
      case "weight":
        return (
          <Input
            type="number"
            value={filters[filter]}
            onChange={(event, data) =>
              handleGeneralChange(event, data, "kpiWeight")
            }
          />
        );
      case "dateUploaded":
        return (
          <>
            <DateInput
              onChange={(event, data) =>
                handleDateChange(event, data, "startDate")
              }
              pickerWidth="100%"
              name={"startDate"}
              value={filters.date.startDate}
              placeholder="Start date"
              iconPosition="left"
              dateFormat="YYYY-MM-DD"
              style={{ width: "100%" }}
            />
            <DateInput
              onChange={(event, data) =>
                handleDateChange(event, data, "endDate")
              }
              pickerWidth="100%"
              name={"endDate"}
              value={filters.date.endDate}
              placeholder="End date"
              iconPosition="left"
              dateFormat="YYYY-MM-DD"
              style={{ width: "100%" }}
            />
          </>
        );
      default:
        return (
          <Dropdown
            placeholder="Select option"
            options={dropDownOptions[filter]}
            selection
            clearable
            onChange={(event, data) => handleGeneralChange(event, data, filter)}
            value={filters[filter]}
          />
        );
    }
  };

  return (
    <li className="filter_item">
      <Checkbox
        className="item_check"
        label={{ children: props.title }}
        onChange={(event, data) => handleChecked(event, data, props.name)}
        checked={currentItem === props.name}
      />
      <Menu
        compact
        style={{ display: currentItem === props.name ? "block" : "none" }}
      >
        {showOptions(props.name)}
      </Menu>
    </li>
  );
};

export default Filter;
