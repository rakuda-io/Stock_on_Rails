import React, { Fragment, useEffect, useReducer } from 'react';
import styled from 'styled-components';

//material ui
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//apis
import { fetchHoldings } from '../apis/holdings';

//reducers
import {
  initialState,
  holdingsActionTypes,
  holdingsReducer,
} from '../reducers/holdings';

//constants
import { REQUEST_STATE } from '../constants';

//css (styled component)
const TickerWrapper = styled.b`
  background: green;
  color: white;
  padding: 5px;
  border-radius: 10px;
`

export const HoldingsList = ({
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
  // holdingsState.holdingsList.map((holding) => (
  //   holding.company_name

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
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell><b>Tickerコード</b></TableCell>
              <TableCell><b>会社名</b></TableCell>
              <TableCell><b>保有数</b></TableCell>
              <TableCell><b>一株配当額</b></TableCell>
              <TableCell><b>年間配当合計</b></TableCell>
              <TableCell align="right"><b></b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {holdingsState.holdingsList.map((holding) => (
              <TableRow key={holding.id}>
                <TableCell>
                  <TickerWrapper>
                    {holding.ticker.toUpperCase()}
                  </TickerWrapper>
                </TableCell>
                <TableCell>{holding.company_name}</TableCell>
                <TableCell>{holding.quantity}株</TableCell>
                <TableCell>${holding.dividend}</TableCell>
                <TableCell>${holding.quantity * holding.dividend}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }
    </Fragment>
  )
}