import React, { Fragment, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Text, Cell, Tooltip } from 'recharts';

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

//images
import MainLogo from '../images/logo.png'
// import MainLogo from '../images/logo.jpg';
// import MainCover from '../images/cover.jpg';

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

//css (styled component)
const MainLogoImage = styled.img`
  height: 20px;
  padding: 0 10px;
`;

const MainLogoText = styled.p`
  text-align: left;
  font-size: 1px;
  color: white;
`

const TickerWrapper = styled.b`
  background: green;
  color: white;
  padding: 5px;
  border-radius: 10px;
`

const Header = styled.div`
  background: #336633;
  padding-left: 10px;
  width: 100%;
`


export const Holdings = ({
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
      <Header>
        <MainLogoText>配当金管理アプリ</MainLogoText>
        <MainLogoImage src={MainLogo} alt='main logo' />
      </Header>
      <p>UserID: {match.params.user_id}</p>
      <PieChart width={730} height={250}>
        <Pie data={holdingsState.holdingsList} dataKey='total_dividend' cx='30%' cy='60%' outerRadius={100} fill='#82ca9d' label={Label} startAngle={90} endAngle={-270}>
          {holdingsState.holdingsList.map((entry,index) =>
            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)
          }
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
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