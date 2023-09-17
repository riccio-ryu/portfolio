import React from 'react'
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchStocks } from '../api';

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

const StockList = styled.ul``;

const Stock = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid transparent;
  box-sizing: border-box;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &:hover {
    border:1px solid ${props => props.theme.accentColor};
    a {
      color: ${(props) => props.theme.accentColor};
    }
    span:last-of-type {
      color: ${props => props.theme.accentColor}
    }
  }
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const PriceStock = styled.div`
  display: flex;
  justify-content: space-between;
  flex-basis: 35%;
`;
const UpStock = styled.span`
  color: ${props => props.theme.upColor};
`
const DownStock = styled.span`
  color: ${props => props.theme.downColor};
`
const NowStock = styled.span`
  color: ${props => props.theme.bgColor};
  font-weight: bold;
`

interface IStocks {
    basDt: string;
    srtnCd: string;
    isinCd: string;
    itmsNm: string;
    mrktCtg: string;
    clpr: number;
    vs: number;
    fltRt: number;
    mkp: number;
    hipr: number;
    lopr: number;
    trqu: number;
    trPrc: number;
    lstgStCnt: number;
    mrktTotAmt: number;
}

function Stocks() {
     const { isLoading, data } = useQuery<IStocks[]>("allStocks", fetchStocks)

     console.log(data);
     
    return (
        <Container>
            <Helmet>
              <title>
                국내주식
              </title>
            </Helmet>
            <Header>
                <Title>Juicy : 주식 시세</Title>
            </Header>
            {isLoading ? (
                <Loader>Load~~~</Loader>
            ) : (
                <StockList>
                     {data?.map((stock) => (
                        <Stock key={stock.isinCd}>
                            <Link to={{
                                pathname: `/${stock.isinCd}`,
                                state: { name: stock.itmsNm },
                                }}>
                                {stock.itmsNm} 
                                <PriceStock>{stock.vs < 0 ? <DownStock>{stock.vs}원</DownStock> : <UpStock>+{stock.vs}원</UpStock>}<NowStock>{stock.clpr}원</NowStock></PriceStock>
                            </Link>
                        </Stock>
                    ))} 
                </StockList>
            )}
        </Container>
    )
}

export default Stocks
