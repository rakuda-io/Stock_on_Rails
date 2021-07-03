import React, { Fragment, useEffect, useReducer } from 'react';
import { PieChart, Pie, Text, Cell, Tooltip } from 'recharts';
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

//css
const ChartsWrapper = styled.div`
  margin: 0px;
`

//円グラフ関連
const Label = ({ ticker, total_dividend, x, y }) => {
  return(
    <>
      <Text x={x} y={y} fill="grey">{ticker.toUpperCase()}</Text>
      <Text x={x} y={y} dominantBaseline="hanging" fill="green">{total_dividend}</Text>
    </>
  )
}

const PIE_COLORS = [
  '#66cdaa', '#f0e68c', '#ffb6c1', '#00bfff', '#e3e548'
];

const CustomTooltip = ({ active, payload }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`$${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};


export const PieCharts = ({
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
        <ChartsWrapper>
          <PieChart width={730} height={250}>
          <Pie data={holdingsState.holdingsList} dataKey='total_dividend' cx='30%' cy='60%' outerRadius={100} fill='#82ca9d' label={Label} startAngle={90} endAngle={-270}>
            {holdingsState.holdingsList.map((entry,index) =>
              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)
            }
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
        </ChartsWrapper>
      }
    </Fragment>
  )}