import React, { Fragment, useContext, useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { Audio } from '@agney/react-loading';
import Grid from '@material-ui/core/Grid';

import { HoldingsData } from './Dashboard';
import { AddDialog } from './AddDialog';

//material ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

//constants
import { REQUEST_STATE } from '../constants';

import {
  initialState,
  holdingsActionTypes,
  holdingsReducer,
} from '../reducers/holdings';

import { fetchHoldings } from '../apis/holdings';
import { UserIdData } from './Dashboard';

//css (styled component)
const TickerWrapper = styled.b`
  background: green;
  color: white;
  padding: 5px;
  border-radius: 10px;
`

export const HoldingsList = () => {
  const { holdingsState } = useContext(HoldingsData);
  const inheritMatch = useContext(UserIdData);

  // 新規保有株追加ダイアログの開閉
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  // useEffect(() => {
  //   fetchHoldings(inheritMatch.match.params.user_id)
  //   .then(() => {})
  // },[holdingsState.holdingsList])

  return(
    <Fragment>
      {
        holdingsState.fetchState === REQUEST_STATE.LOADING ?
          <Fragment>
            <Grid
              container
              spacing={2}
              direction="column"
              alignItems="center"
            >
              <Grid item xs={3}>
                <Audio width="50" color="#3db70f" />
              </Grid>
            </Grid>
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
                <TableCell size='small'>{holding.company_name}</TableCell>
                <TableCell>{holding.quantity}株</TableCell>
                <TableCell>${holding.dividend}</TableCell>
                <TableCell>${holding.total_dividend}</TableCell>
                <TableCell><Button color="primary" onClick={handleDialogOpen}>＋</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }
      <AddDialog isOpen={dialogOpen} doClose={() => handleDialogClose()}/>
    </Fragment>
  )
}