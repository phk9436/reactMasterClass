import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";

interface props {
  coinId: string | undefined;
}

function Chart({ coinId }: props) {
  const now = dayjs();
  const endDate = now.format('YYMMDDHHmmss');
  const startDate = now.subtract(7, "d").format('YYMMDDHHmmss');
  console.log(endDate, startDate)
  const getChart = async () =>
    await axios.get(
      `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}&start=${startDate}&end=${endDate}`
    );
  const { isLoading, data } = useQuery(["ChartData"], getChart);
  data?.status === 200 && console.log(data.data)
  return <div>Chart</div>;
}

export default Chart;
