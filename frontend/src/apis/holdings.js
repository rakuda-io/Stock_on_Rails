// 保有株一覧を呼ぶための関数

import axios from 'axios';
import { holdingsIndex } from '../urls/index';
import { holdingsAdd } from '../urls/index';

export const fetchHoldings = (user_id) => {
  return axios.get(holdingsIndex(user_id))
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}

export const postHoldings = (user_id, ticker, quantity) => {
  return axios.post(holdingsIndex(user_id),
  {
    ticker: ticker,
    quantity: quantity
  },)
  .then(res => {
    // console.log(res)
    // this.setState({
    //   ticker: ticker,
    //   quantity: quantity,
    // })
    return res.data
  })
  .catch((e) => console.error(e))
}