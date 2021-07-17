// 米国株一覧を呼ぶための関数

import axios from 'axios';
import { stocksIndex } from '../urls/index';

export const fetchStocks = () => {
  return axios.get(stocksIndex())
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}