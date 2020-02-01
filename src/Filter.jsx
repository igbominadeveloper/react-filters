import React, { useState } from 'react';
import { Checkbox, Menu, Dropdown } from 'semantic-ui-react';

import { mocks } from '../mocks';

const options = {
  'perspective': [
    { key: 1, text: "Choice 1", value: 1 },
    { key: 2, text: "Choice 2", value: 2 },
    { key: 3, text: "Choice 3", value: 3 }
  ],
  'data-source': [
    { key: 1, text: "Choice 1", value: 1 },
    { key: 2, text: "Choice 2", value: 2 },
    { key: 3, text: "Choice 3", value: 3 }
  ],
  'data-type': [
    { key: 1, text: "Choice 1", value: 1 },
    { key: 2, text: "Choice 2", value: 2 },
    { key: 3, text: "Choice 3", value: 3 }
  ],
  'dateUploaded': [
    { key: 1, text: "Choice 1", value: 1 },
    { key: 2, text: "Choice 2", value: 2 },
    { key: 3, text: "Choice 3", value: 3 }
  ]
}

  const Filter = props => {

  const [currentItem, setCurrentItem] = useState("");
  
  const handleChecked = (...args) => {
    console.log(currentItem);
    const { name, checked } = args[1];
    if (checked && name !== currentItem) {
      return setCurrentItem(name);
    }
    return setCurrentItem('');
  };

  const perspectives = mocks.map(mock => mock.kpiPerspective);

    return (
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
        <Dropdown text="Select option" options={options[props.name]} selection item />
      </Menu>
    </li>
  );
}

  export default Filter;