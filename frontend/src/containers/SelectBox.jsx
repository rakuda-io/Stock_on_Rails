import React, { useEffect, useReducer, useContext, } from 'react';
import { makeStyles, } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

import { fetchStocks, } from '../apis/stocks';
import { postHoldings } from '../apis/holdings';
import { initialState, holdingsActionTypes, stocksReducer } from '../reducers/stocks';
import { REQUEST_STATE } from '../constants';
import { FormHelperText } from '@material-ui/core';
import { UserIdData } from './Dashboard';

export const StocksData = React.createContext()

const useStyles = makeStyles((theme) => ({
  margin1: {
    marginBottom: theme.spacing(1),
  },
  margin2: {
    marginTop: theme.spacing(3)
  },
  button: {
    marginTop: theme.spacing(8),
    marginRight: theme.spacing(2),
    float: "right",
  }
}));

export const CustomizedSelects = () => {
  const inheritMatch = useContext(UserIdData);
  const classes = useStyles();
  const [ticker, setTicker] = React.useState('')
  const [quantity, setQuantity] = React.useState(0)
  // const u_id = useParams();
  // const TickerInputValue = (event) => {
  //   setTicker(event.target.value);
  // };
  // const QuantityInputValue = (event) => {
  //   setQuantity(event.target.value);
  // }
  const handleSubmit = (e) => {
    console.log(inheritMatch.match.params.user_id)
    console.log(ticker)
    console.log(quantity)
    e.preventDefault();
    postHoldings(inheritMatch.match.params.user_id, ticker, quantity)
    .then(() => {
      {window.location.reload()}
  })}


  const [stocksState, dispatch] = useReducer(stocksReducer, initialState);
  useEffect(() => {
    dispatch({ type: holdingsActionTypes.FETCHING });
    fetchStocks()
    .then((data) => {
      dispatch({
        type: holdingsActionTypes.FETCH_SUCCESS,
        payload: {
          stocks: data
        }
      });
    })
  }, [])

  //Select Boxの中身
  const tickers = []
  if(stocksState.fetchState === REQUEST_STATE.OK) {
    const map = new Map()
    const tmp = Object.entries(stocksState.stocksList).map(([key, value]) => ({key, value}))
    map.set(tmp[0]['value']['stocks'], tmp[0]['value']['stocks'])
    const stocks = Array.from(map)
    stocks[0][0].map((ticker) => {
      tickers.push({ value: ticker, label: ticker})
    })
  }

  return (
    <div>
      <FormHelperText className={classes.margin1}>Select Ticker Symbol</FormHelperText>
      <Autocomplete
        id="combo-box-demo"
        options={tickers}
        getOptionLabel={(option) => option.label}
        style={{ width: 210 }}
        onChange={(event) => setTicker(event.target.innerHTML)}
        renderInput={(params) =>
          <TextField
            {...params}
            label="銘柄を選んでください"
            variant="outlined"
            value={ticker}
          />
        }
      />

      <FormHelperText className={classes.margin2}>Select Quantity</FormHelperText>
      <TextField
        id="native-select"
        type="number"
        value={quantity}
        InputProps={{ inputProps: { min: 0 } }}
        onChange={(event) => setQuantity(parseFloat(event.target.value))}
        />

      <Button
        className={classes.button}
        type="button"
        variant="outlined"
        color="primary"
        onClick={handleSubmit}
      >
        登録
      </Button>
    </div>
  );
}