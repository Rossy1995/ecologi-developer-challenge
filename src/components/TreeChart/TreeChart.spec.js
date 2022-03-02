import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import TreeChart from "./TreeChart";

fetch.mockResponseOnce(
  JSON.stringify({ data: [["mockNumOfTree", "mockDate"]] })
);

describe("TreeChart", () => {
  it("should render the component onto the screen", () => {
    render(<TreeChart />);
    expect(true).toBeTruthy();
  });

  it("should render the trees planted line chart", async () => {
    render(<TreeChart />);
    await waitFor(() => {
      screen.getByTestId("tree-planting-data-chart");
    });
  });

  it("should render the date picker and filter button onto the screen", () => {
    render(<TreeChart />);
    screen.getByTestId("start-date-input");
    screen.getByTestId("end-date-input");
    screen.getByTestId("filter-button");
  });
});
