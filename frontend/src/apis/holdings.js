// 保有株一覧を呼ぶための関数

import axios from 'axios';
import { holdingsIndex } from '../urls/index';

export const fetchHoldings = (userId) => {
  return axios.get(holdingsIndex(userId))
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}