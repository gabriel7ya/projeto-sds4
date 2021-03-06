import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSum } from 'types/sales';
import { BASE_URL } from 'utils/requests';

type ChartData = {
  labels: string[];
  series: number[];
};

const DonutChart = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    series: [],
  });
  // let chartData: ChartData = { labels: [], series: [] };

  useEffect(() => {
    axios.get(`${BASE_URL}/sales/amount-by-seller`).then((response) => {
      const dt = response.data as SaleSum[];
      const myLabels = dt.map((x) => x.sellerName);
      const mySeries = dt.map((x) => x.sum);
      setChartData({ labels: myLabels, series: mySeries });
    });
  }, []);

  const options = {
    legend: {
      show: true,
    },
  };

  return (
    <Chart
      options={{ ...options, labels: chartData.labels }}
      series={chartData.series}
      type="donut"
      height="240"
    />
  );
};

export default DonutChart;
