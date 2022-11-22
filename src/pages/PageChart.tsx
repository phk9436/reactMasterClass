import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import Chart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { themeState } from "atoms/atoms";

interface props {
  coinId: string | undefined;
}

interface historyData {
  close: string;
  high: string;
  low: string;
  market_cap: number;
  open: string;
  time_close: number;
  time_open: number;
  volume: string;
}

function PageChart({ coinId }: props) {
  const [chartData, setChartData] = useState<historyData[]>();
  const theme = useRecoilValue(themeState);
  const getChart = async () =>
    await axios.get(
      `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
    );
  const { isLoading, data } = useQuery(["ChartData"], getChart);

  useMemo(() => data?.status === 200 && setChartData(data?.data), [data]);

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <Chart
          type="line"
          series={[
            {
              name: "volume",
              data: chartData?.map((e) => ({
                x: dayjs(e.time_close).format("hh:mm:ss"),
                y: Number(e.volume),
              })) || [null],
            },
          ]}
          options={{
            theme: {
              mode: theme,
            },
            chart: {
              height: 500,
              width: 500,
              background: "transparent",
              toolbar: {
                show: false,
              },
            },
            grid: {
              show: false,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            fill: {
              type: "gradient",
              gradient: {
                type: "horizontal",
                stops: [0, 100],
              },
            },
            tooltip: {
              y: {
                formatter: (value) => `${Math.ceil(value / 1000)}k`,
              },
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
          }}
        />
      )}
    </div>
  );
}

export default PageChart;
