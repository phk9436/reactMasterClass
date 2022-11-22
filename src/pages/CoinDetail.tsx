import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Route, Routes, Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import PageChart from "./PageChart";
import { useQuery } from "@tanstack/react-query";

interface CoinState {
  state: { name: string; rank: number };
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function CoinDetail() {
  const { id } = useParams();
  const { state } = useLocation() as CoinState;
  const priceMatch = useMatch("/:id/price");
  const chartMatch = useMatch("/:id/chart");
  const [coinData, setCoinData] = useState<InfoData>();
  const [tickerData, setTickerData] = useState<PriceData>();

  const getCoinInfo = async () =>
    await axios.get(`https://api.coinpaprika.com/v1/coins/${id}`);
  const getTickerInfo = async () =>
    await axios.get(`https://api.coinpaprika.com/v1/tickers/${id}`);

  const {
    isLoading: CoinLoading,
    data: Coin,
    isSuccess: CoinSuccess,
  } = useQuery(["CoinInfo", id], getCoinInfo);
  const {
    isLoading: TickerLoading,
    data: Ticker,
    isSuccess: TickerSuccess,
  } = useQuery(["TickerInfo", id], getTickerInfo, {
    refetchInterval: 5000
  });

  const loading = CoinLoading && TickerLoading;
  const success = CoinSuccess && TickerSuccess;

  useEffect(() => {
    setCoinData(Coin?.data);
    setTickerData(Ticker?.data);
  }, [loading, Ticker]);
  
  return (
    <Container>
      <Header>
        <h1>
          {" "}
          {state?.name ? state.name : loading ? "Loading..." : coinData?.name}
        </h1>
      </Header>
      {loading ? (
        "Loading..."
      ) : !success ? (
        "코인이 존재하지 않습니다"
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{coinData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${coinData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickerData?.quotes.USD.price.toFixed(2)}</span>
            </OverviewItem>
          </Overview>
          <Description>{coinData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickerData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickerData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={priceMatch !== null}>
              <Link to="price">Price</Link>
            </Tab>
            <Tab isActive={chartMatch !== null}>
              <Link to="chart">Chart</Link>
            </Tab>
          </Tabs>

          <Routes>
            <Route path={"price"} element={<Price />} />
            <Route path={"chart"} element={<PageChart coinId={id}/>} />
          </Routes>
        </>
      )}
    </Container>
  );
}

export default CoinDetail;

const Container = styled("div")`
  padding: 0 20px;
  max-width: 500px;
  margin: auto;
`;

const Header = styled("header")`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 48px;
    color: ${(props) => props.theme.textColor};
  }
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.textBrightColor};
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  color: ${(props) => props.theme.textBrightColor};
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;

  a {
    display: block;
    color: ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textBrightColor};
  }
`;
