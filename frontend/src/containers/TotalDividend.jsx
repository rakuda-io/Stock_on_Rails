import React, { Fragment, useEffect, useReducer } from 'react';
import styled from 'styled-components';

//reducers
import {
  initialState,
  holdingsActionTypes,
  holdingsReducer,
} from '../reducers/holdings';

//apis
import { fetchHoldings } from '../apis/holdings';

//constants
import { REQUEST_STATE } from '../constants';

//CSS
const DividendWrapper = styled.p`
  font-size: 30px;
  margin-left: 14px;
`


export const Total_dividend = ({
  match
  }) => {
  const [holdingsState, dispatch] = useReducer(holdingsReducer, initialState);
  useEffect(() => {
    dispatch({ type: holdingsActionTypes.FETCHING});
    fetchHoldings(match.params.user_id)
    .then((data) => {
      dispatch({
        type: holdingsActionTypes.FETCH_SUCCESS,
        payload: {
          holdings: data[0].holdings
        }
      });
    })
  },[match.params.user_id])

  const total = holdingsState.holdingsList.reduce((p, x) => p + x.total_dividend, 0)

  return(
    <Fragment>
      {
        holdingsState.fetchState === REQUEST_STATE.LOADING ?
          <Fragment>
            <p>
              ロード中...
            </p>
          </Fragment>
        :
        <>
        <p>年間配当金額合計</p>
        <DividendWrapper>＄{total.toFixed(3)}-</DividendWrapper>


        <p>月別配当額を見る</p>
        </>
      }
    </Fragment>
  )}