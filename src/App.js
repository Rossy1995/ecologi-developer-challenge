import React from "react";
import "./App.css";
import TreeChart from "./components/TreeChart/TreeChart";
import { H, Section } from "react-headings";

const App = () => {
  return (
    <div>
      <Section component={<H>Ecologi Tree Planting Statistics</H>}>
        This chart displays information about trees planted per day since launch
        <TreeChart />
      </Section>
    </div>
  );
};

export default App;
