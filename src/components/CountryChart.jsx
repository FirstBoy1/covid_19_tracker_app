import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useTheme } from 'styled-components';

export default function CountryChart({ details, country }) {
  const [chartData, setChartData] = useState({});
  const { infected, deaths, recovered } = details;
  const theme = useTheme();

  useEffect(() => {
    setChartData({
      labels: ['Infected', 'Recovered', 'Deaths'],
      datasets: [
        {
          data: [infected, recovered, deaths],
          backgroundColor: [theme.blue, theme.green, theme.red],
        },
      ],
    });
  }, [deaths, infected, recovered, theme]);

  return (
    <div>
      {
        <Bar
          data={chartData}
          legend={{ display: !!!country }}
          options={{
            responsive: true,
            title: { text: `Current state in ${country}`, display: true },
          }}
        />
      }
    </div>
  );
}
