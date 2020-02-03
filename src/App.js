import React from "react";

import Filters from "./Filters";

import "./styles.scss";

export default function App() {

  // build out the options for the filters
  // KPI Perpective
  const filters = [
    { title: "KPI Perspective", name: "kpiPerspective" },
    { title: "KPI Target Type", name: "kpiTargetType" },
    { title: "Date Uploaded", name: "dateUploaded" },
    { title: "KPI Weight", name: "weight" }
  ];

  return (
    <div className="App">
      <h3 className="filter_list_head">Filtering Options</h3>
      <ul className="filters_list">
        <Filters filters={filters} />
      </ul>
    </div>
  );
}
