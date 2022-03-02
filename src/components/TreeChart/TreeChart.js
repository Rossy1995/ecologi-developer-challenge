import React, { useEffect, useState, useRef } from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import api from "../../api";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const TreeChart = () => {
  const [chartData, setChartData] = useState([]);
  const [daysSinceLaunch, setDaysSinceLaunch] = useState([]);
  const [filteredData, setFilteredData] = useState(chartData);
  const [filteredDates, setFilteredDates] = useState(daysSinceLaunch);
  const startDate = useRef();
  const endDate = useRef();

  let isFilteredData = filteredData.length > 0 ? filteredData : chartData;
  let isFilteredDates =
    filteredDates.length > 0 ? filteredDates : daysSinceLaunch;

  useEffect(() => {
    const fetchTreePlantingData = async () => {
      try {
        // Retrieve mapped response from Ecologi's API
        const response = await api.getTreesPlantedData();

        if (response instanceof Error) {
          throw Error;
        }

        // Generate new array containing all dates in dd/mm/yyyy format
        const getRangeOfDays = [
          ...new Set(
            response.map((data) =>
              new Date(data.date * 1000).toLocaleDateString("en-GB")
            )
          ),
        ];

        // Sort the array from earliest to latest
        getRangeOfDays.sort(function (a, b) {
          var firstDate = a.split("/").reverse().join(),
            lastDate = b.split("/").reverse().join();
          return firstDate < lastDate ? -1 : firstDate > lastDate ? 1 : 0;
        });

        // Create new array containing total number of trees planted per day
        const getSumOfTreesPerDay = Array.from(
          response.reduce(
            (acc, { date, numOfTree }) =>
              acc.set(date, (acc.get(date) || 0) + numOfTree),
            new Map()
          ),
          ([date, numOfTree]) => numOfTree
        );

        setChartData(getSumOfTreesPerDay);
        setDaysSinceLaunch(getRangeOfDays);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTreePlantingData();
  }, []);

  const filterChartData = () => {
    const dates = [...daysSinceLaunch];
    const treeData = [...chartData];

    // Retrieve value from date picker
    let startDateValue = new Date(startDate.current.value).toLocaleDateString(
      "en-GB"
    );
    let endDateValue = new Date(endDate.current.value).toLocaleDateString(
      "en-GB"
    );

    // Retrieve index position based on values in date picker
    const firstDate = dates.indexOf(startDateValue);
    const lastDate = dates.indexOf(endDateValue);

    // Create new array containing the filtered dates and trees planted
    const filterDates = dates.slice(firstDate, lastDate + 1);
    const filterTreeData = treeData.slice(firstDate, lastDate + 1);

    setFilteredDates(filterDates);
    setFilteredData(filterTreeData);
  };

  return (
    <>
      <div>
        <Line
          data-testid="tree-planting-data-chart"
          data={{
            labels: isFilteredDates,
            datasets: [
              {
                label: "# of trees planted",
                data: chartData,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          width={600}
          height={400}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                min: 0,
                max: Math.max(...isFilteredData),
              },
            },
          }}
        />
      </div>
      <StyledDiv>
        <input data-testid="start-date-input" type="date" ref={startDate} />
        <input data-testid="end-date-input" type="date" ref={endDate} />
        <button data-testid="filter-button" onClick={filterChartData}>
          Filter
        </button>
      </StyledDiv>
    </>
  );
};

export default TreeChart;
