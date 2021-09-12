import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSuccess } from 'types/sales';
import { round } from 'utils/format';
import { BASE_URL } from 'utils/requests';

type SeriesData = {
  name: string;
  data: number[];
};
type ChartData = {
  labels: {
    categories: string[];
  };
  series: SeriesData[];
};

const BarChart = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: {
      categories: [],
    },
    series: [
      {
        name: '% Sucesso',
        data: [],
      },
    ],
  });

  useEffect(() => {
    axios.get(`${BASE_URL}/sales/success-by-seller`).then((response) => {
      const dt = response.data as SaleSuccess[];
      const myLabels = dt.map((x) => x.sellerName);
      const mySeries = dt.map((x) => round((100 * x.deals) / x.visited, 1));
      //     sellerName: string;
      // visited: number;
      // deals: number;
      setChartData({
        labels: {
          categories: myLabels,
        },
        series: [
          {
            name: '% Sucesso',
            data: mySeries,
          },
        ],
      });
    });
  }, []);

  const options = {
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
  };

  return (
    <Chart
      options={{ ...options, xaxis: chartData.labels }}
      series={chartData.series}
      type="bar"
      height="240"
    />
  );
};

export default BarChart;
