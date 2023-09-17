import ApexCharts from 'react-apexcharts'
import React from 'react'
import { useQuery } from "react-query"
import { fetchStockHistory } from '../api'

interface IHistorical {
    basDt: string;
    srtnCd: string;
    isinCd: string;
    itmsNm: string;
    mrktCtg: string;
    clpr: string;
    vs: string;
    fltRt: string;
    mkp: string;
    hipr: string;
    lopr: string;
    trqu: string;
    trPrc: string;
    lstgStCnt: string;
    mrktTotAmt: string;
  }
interface IChart {
    stockId: string;
}

function Chart({ stockId }: IChart) {
    const { isLoading, data } = useQuery<IHistorical[]>(["history", stockId], ()=> fetchStockHistory(stockId), { refetchInterval: 50000 })
    
    return (
        <div>
            {isLoading ? (
                "Loading chart..."
            ) : (
                <ApexCharts
                type="line"
                series={[
                    {
                    name: "Price",
                    data: data?.map((price) => price.clpr).reverse(),
                    },
                ]}
                options={{
                    theme: {
                    mode: "dark",
                    },
                    chart: {
                    height: 300,
                    width: 500,
                    toolbar: {
                        show: false,
                    },
                    background: "transparent",
                    },
                    grid: { show: false },
                    stroke: {
                    curve: "smooth",
                    width: 4,
                    },
                    yaxis: {
                    show: false,
                    },
                    xaxis: {
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                    labels: { show: false },
                    type: "category",
                    categories: data?.map((price) => price.basDt).reverse(),
                    },
                    fill: {
                      type: "gradient",
                      gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
                    },
                    colors: ["#0fbcf9"],
                    tooltip: {
                      y: {
                        formatter: (value) => `$${value.toFixed(2)}`,
                      },
                    },
                }}
                />
            )}
        </div>
    )
}

export default Chart
