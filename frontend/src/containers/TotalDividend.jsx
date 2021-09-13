import React, { Fragment, useContext } from 'react';
import styled from 'styled-components';

import { HoldingsData } from './Dashboard';

//constants
import { REQUEST_STATE } from '../constants';

//CSS
const DividendWrapper = styled.p`
  font-size: 30px;
  margin-left: 14px;
`

export const Total_dividend = () => {
  const { holdingsState } = useContext(HoldingsData);
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