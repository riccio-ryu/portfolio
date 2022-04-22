import React from 'react'
import { useQuery } from 'react-query';
import { Switch, Route, useParams, useLocation, useRouteMatch, Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchStockInfo } from '../api';
import Chart from "./Chart";
import Price from "./Price";
import { Helmet } from 'react-helmet';



const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 33%;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
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
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    padding: 7px 0px;
    display: block;
  }
`;


interface IParams {
    stockId: string;
}
interface ILocation {
    name: string;
}
interface IData {
    basDt: string;
    clpr: string;
    fltRt: string;
    hipr: string;
    isinCd: string;
    itmsNm: string;
    lopr: string;
    lstgStCnt: string;
    mkp: string;
    mrktCtg: string;
    mrktTotAmt: string;
    srtnCd: string;
    trPrc: string;
    trqu: string;
    vs: string;
}

function Stock() {
    const { stockId } = useParams<IParams>()
    const { state } = useLocation<ILocation>()
    const priceMatch = useRouteMatch("/:stockId/price");
    const chartMatch = useRouteMatch("/:stockId/chart");
    const { isLoading:infoLoading, data: infoData } = useQuery<IData>(
      ["info", stockId],
      ()=>fetchStockInfo(stockId),
      {
        refetchInterval: 50000,
      }
    )
    const loading = infoLoading
    
    return (
        <Container>
            <Helmet>
              <title>
                {state?.name ? state.name : loading ? "Loading..." : infoData?.itmsNm}
              </title>
            </Helmet>
            <Header>
                <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.itmsNm}</Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                <Overview>
                    <OverviewItem>
                    <span>주식의 시장 구분:</span>
                    <span>{infoData?.mrktCtg}</span>
                    </OverviewItem>
                    <OverviewItem>
                    <span>하루 중 가격의 최고치:</span>
                    <span>{infoData?.hipr}</span>
                    </OverviewItem>
                    <OverviewItem>
                    <span>하루 중 가격의 최저치:</span>
                    <span>{infoData?.lopr}</span>
                    </OverviewItem>
                </Overview>
                <Description>전일 대비 등락: {infoData?.vs}</Description>
                <Overview>
                    <OverviewItem>
                    <span>체결수량의 누적 합계:</span>
                    <span>{infoData?.trqu}</span>
                    </OverviewItem>
                    <OverviewItem>
                    <span>규시장의 매매시간종료시까지 형성되는 최종가격:</span>
                    <span>{infoData?.clpr}</span>
                    </OverviewItem>
                </Overview>

                <Tabs>
                    <Tab isActive={chartMatch !== null}>
                    <Link to={`/${stockId}/chart`}>Chart</Link>
                    </Tab>
                    <Tab isActive={priceMatch !== null}>
                    <Link to={`/${stockId}/price`}>Price</Link>
                    </Tab>
                </Tabs>

                <Switch>
                    <Route path={`/:stockId/price`}>
                    <Price />
                    </Route>
                    <Route path={`/:stockId/chart`}>
                    <Chart stockId={stockId} />
                    </Route>
                </Switch>
                </>
            )}
        </Container>
    )
}

export default Stock
