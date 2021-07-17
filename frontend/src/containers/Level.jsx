import React, { Fragment, useContext } from 'react';
import styled from 'styled-components';

import { HoldingsData } from './Dashboard';

//constants
import { REQUEST_STATE } from '../constants';

//CSS
const LvWrapper = styled.p`
  font-size: 30px;
  margin-left: 14px;
  margin: 0 0 0 0;
`

export const Level = () => {
  const { holdingsState } = useContext(HoldingsData);
  const Total = holdingsState.holdingsList.reduce((p, x) => p + x.total_dividend, 0)
  const Level = (Total,lv) => {
    if(Total >= 5){
      lv = 3
    }else if(Total >= 1) {
      lv = 2
    }else if(Total > 0) {
      lv = 1
    }
    return(lv)
  }
  const LvMessage = (Level, message) => {
    if(Level === 3){
      message = 'レベル3だと●●相当ですね'
    }else if(Level === 2){
      message = 'レベル2だと'
    }else if(Level === 1){
      message = 'レベル1だと'
    }else if(Level === 2){
      message = 'レベル2だと'
    }else if(Level === 2){
      message = 'レベル2だと'
    }else if(Level === 2){
      message = 'レベル2だと'
    }else if(Level === 2){
      message = 'レベル2だと'
    }else if(Level === 2){
      message = 'レベル2だと'
    }
    return(message)
  }

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
        <LvWrapper>
          <p>Lvは{Level(Total)}です</p>
        </LvWrapper>
        <p>{LvMessage(Level(Total))}</p>
        </>
      }
    </Fragment>
  )}