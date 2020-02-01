import React, { useState } from "react";
import { Checkbox, Dropdown, Menu } from "semantic-ui-react";

import mocks from "../mocks";

import "./styles.scss";

export default function App() {
  const [currentItem, setCurrentItem] = useState("");

  const handleChecked = (...args) => {
    const { name, checked } = args[1];
    if (checked) {
      return setCurrentItem(name);
    }
    return setCurrentItem('');
  };

  // build out the options for the filters
  // KPI Perpective

  const options = [
    { key: 1, text: "Choice 1", value: 1 },
    { key: 2, text: "Choice 2", value: 2 },
    { key: 3, text: "Choice 3", value: 3 }
  ];

  const Filter = props => (
    <li className="filter_item">
      <Checkbox
        className="item_check"
        label={{ children: props.title }}
        onChange={(event, data) => handleChecked(event, data)}
        name={props.name}
        checked={currentItem === props.name}
      />
      <Menu
        compact
        style={{ display: currentItem !== props.name ? "none" : "block" }}
      >
        <Dropdown text="Select option" options={options} selection item />
      </Menu>
    </li>
  );

  const filters = [
    { title: "KPI Perspective", name: "perspective" },
    { title: "KPI Data Source", name: "data-source" },
    { title: "KPI Data Type", name: "data-type" },
    { title: "Date Uploaded", name: "dateUploaded" }
  ];

  return (
    <div className="App">
      <h3 className="filter_list_head">Filtering Options</h3>
      <ul className="filters_list">
        {filters.map(filter => (
          <Filter {...filter} key={filter.title} />
        ))}
      </ul>
    </div>
  );
}
