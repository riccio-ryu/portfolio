const BASE_URL = `https://api.odcloud.kr/api/GetStockSecuritiesInfoService/v1/getStockPriceInfo?resultType=json&serviceKey=GU%2FPw6QXvxX8rdXGsY9vDQWG3v8mr8imsKIAHd11KmEe0GOfu5NFoK4bv96cfhkwLKdy85VXG1mtXprIuY2HAw%3D%3D`;
const COUNT = `numOfRows`;
const PAGE = `pageNo`;
const ITEM = `isinCd`;

export function fetchStocks() {
    return fetch(`${BASE_URL}&${COUNT}=20&${PAGE}=1`).then((response) => 
        response.json().then(
            (res) => 
            res.response.body.items.item
        )
    )
}

export function fetchStockInfo(stockId: string) {
    return fetch(`${BASE_URL}&${COUNT}=20&${PAGE}=1&${ITEM+'='+stockId}`).then((response) => 
        response.json().then(
            (res) => 
            res.response.body.items.item[0]
        )
    )
}

export function fetchStockHistory(stockId: string) {
    return fetch(`${BASE_URL}&${COUNT}=20&${PAGE}=1&${ITEM+'='+stockId}`).then((response) => 
        response.json().then(
            (res) => 
            res.response.body.items.item
        )
    )
  }