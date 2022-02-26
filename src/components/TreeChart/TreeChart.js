import React, { useEffect, useState } from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import api from "../../api";

const TreeChart = () => {
  const [chartData, setChartData] = useState([]);
  const [daysSinceLaunch, setDaysSinceLaunch] = useState([]);

  useEffect(() => {
    const fetchTreePlantingData = async () => {
      try {
        const response = await api.getTreesPlantedData();

        if (response instanceof Error) {
          throw Error;
        }

        const getRangeOfDays = [
          ...new Set(
            response.map((data) =>
              new Date(data.date * 1000).toLocaleDateString("en-GB")
            )
          ),
        ];

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

  return (
    <div>
      <Line
        data={{
          labels: daysSinceLaunch,
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
          maintainAspectRatio: false,
          scales: {
            y: {
              min: 0,
              max: 200,
              ticks: {
                // min max not inside here anymore
              },
            },
          },
        }}
      />
    </div>
  );
};

export default TreeChart;
