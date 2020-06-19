import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useTheme } from 'styled-components';

import { api_endpoint } from '../config';

export default function GlobalChart() {
  const [chartData, setChartData] = useState({});
  const theme = useTheme();

  function chart(labels, infectedData, deathsData) {
    setChartData({
      labels,
      datasets: [
        {
          label: 'Infected',
          data: infectedData,
          backgroundColor: ['hsla(250, 10%, 70%, .5'],
          borderColor: theme.blue,
        },
        {
          label: 'Deaths',
          data: deathsData,
          backgroundColor: ['#FD7D7D'],
          borderColor: theme.red,
        },
      ],
    });
  }

  useEffect(() => {
    (async () => {
      const res = await fetch(`${api_endpoint}/daily`);
      const jsonRes = await res.json();
      const labels = new Array(jsonRes.length);
      const deathsData = new Array(jsonRes.length);
      const recoveredData = new Array(jsonRes.length);
      const infectedData = new Array(jsonRes.length);
      jsonRes.forEach(({ confirmed, deaths, recovered, reportDate }, idx) => {
        labels[idx] = reportDate;
        deathsData[idx] = deaths.total;
        infectedData[idx] = confirmed.total;
        recoveredData[idx] = recovered.tota;
      });
      chart(labels, infectedData, deathsData);
    })();
  }, []);

  return (
    <div>
      {
        <Line
          data={chartData}
          options={{
            responsive: true,
          }}
        />
      }
    </div>
  );
}
