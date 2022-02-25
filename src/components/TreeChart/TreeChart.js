import React, { useEffect, useState } from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
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

        // const mappedDates = response.data.map(function (days) {
        //   const dates = new Date(days[1] * 1000).toLocaleDateString("en-GB");
        //   return dates;
        // });

        // const mappedTrees = response.data.map(function (trees) {
        //   const numOfTrees =
        // });

        setChartData(response.data);
        setDaysSinceLaunch(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTreePlantingData();
  });

  return (
    <div>
      <Bar
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
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default TreeChart;
