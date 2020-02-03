import React, { useState } from "react";
import { Checkbox, Menu, Dropdown, Input, s, Button } from "semantic-ui-react";
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

const Filters = props => {
  const [currentItem, setCurrentItem] = useState("");
  const [date, setDate] = useState({
    startDate: "",
    endDate: ""
  });

  const [kpiPerspective, setKpiPerspective] = useState("");
  const [kpiWeight, setKpiWeight] = useState(0);
  const [kpiTargetType, setKpiTargetType] = useState("");

  const handleChecked = (...args) => {
    const [event, data, filter] = args;
    if (data.checked) {
      return setCurrentItem(filter);
    }
    return setCurrentItem("");
  };

  const handleDateChange = (...args) => {
    const [event, data, filter] = args;
    setDate({
      ...date,
      [filter]: data.value
    });
  };

  const showOptions = filter => {
    switch (filter) {
      case "weight":
        return (
          <Input
            type="number"
            value={kpiWeight}
            onChange={event => setKpiWeight(Number(event.target.value))}
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
              name={"from"}
              value={date.startDate}
              placeholder="from"
              iconPosition="left"
              dateFormat="YYYY-MM-DD"
              style={{ width: "100%" }}
              clearable
            />
            <DateInput
              onChange={(event, data) =>
                handleDateChange(event, data, "endDate")
              }
              pickerWidth="100%"
              name={"to"}
              value={date.endDate}
              placeholder="to"
              iconPosition="left"
              dateFormat="YYYY-MM-DD"
              style={{ width: "100%" }}
              clearable
            />
          </>
        );

      case "kpiPerspective":
        return (
          <Dropdown
            placeholder="Select option"
            options={dropDownOptions[filter]}
            selection
            clearable
            onChange={(event, data) => setKpiPerspective(data.value)}
            value={kpiPerspective}
          />
        );
      default:
        return (
          <Dropdown
            placeholder="Select option"
            options={dropDownOptions[filter]}
            selection
            clearable
            onChange={(event, data) => setKpiTargetType(data.value)}
            value={kpiTargetType}
          />
        );
    }
  };

  const validate = () => {
    const data = {kpiPerspective,kpiTargetType,kpiWeight, date};
    return Object.values(data).some(value => {
      if(typeof value === 'object'){          
        return value.startDate !== '' || value.endDate !== ''
      }
      if(typeof value === 'number'){
        return value > 0
      };
      return value.length > 0;
    });
  }

  const handleFilters = () => {
    const isValid = validate();
    const data = {kpiPerspective,kpiTargetType,kpiWeight, date};
    if(isValid){
       console.log(data)
      // fire the request here
    }
  };

  return (
    <>
      {props.filters.map(filter => (
        <li className="filter_item" key={Math.random()}>
          <Checkbox
            className="item_check"
            label={{ children: filter.title }}
            onChange={(event, data) => handleChecked(event, data, filter.name)}
            checked={currentItem === filter.name}
          />
          <Menu
            compact
            style={{ display: currentItem === filter.name ? "block" : "none" }}
          >
            {showOptions(filter.name)}
          </Menu>
        </li>
      ))}

      <Button 
        style={{
          background: '#E91300 0% 0%',
          color: '#ffffff',
          width: '159px',
          padding: '15px',
          borderRadius: '24px',
          opacity: 1,
        }}
      onClick={handleFilters}
      disabled={! validate()}
    >
        APPLY FILTER
      </Button>
    </>
  );
};

export default Filters;
