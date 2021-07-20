import React, { useEffect, useReducer, } from 'react';
import { makeStyles, } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

import { fetchStocks } from '../apis/stocks';
import { initialState, holdingsActionTypes, stocksReducer } from '../reducers/stocks';
import { REQUEST_STATE } from '../constants';
import { FormHelperText } from '@material-ui/core';

export const StocksData = React.createContext()

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(3)
  },
  button: {
    marginTop: theme.spacing(10),
    padding: 10,
  }
}));

export const CustomizedSelects = () => {
  const classes = useStyles();
  const [ticker, setTicker] = React.useState('')
  const [quantity, setQuantity] = React.useState(0)
  const TickerHandleChange = (event) => {
    setTicker(event.target.value);
  };
  const QuantityHandleChange = (event) => {
    setQuantity(event.target.value);
  }
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
  // const tickers = []
  // if(stocksState.fetchState === REQUEST_STATE.OK) {
  //   const map = new Map()
  //   const tmp = Object.entries(stocksState.stocksList).map(([key, value]) => ({key, value}))
  //   map.set(tmp[0]['value']['stocks'], tmp[0]['value']['stocks'])
  //   const arrayStocks = Array.from(map)
  //   arrayStocks[0][0].map((ticker) =>
  //     tickers.push(ticker)
  //   )
  // }

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
      <Autocomplete
        id="combo-box-demo"
        options={tickers}
        getOptionLabel={(option) => option.label}
        style={{ width: 210 }}
        renderInput={(params) =>
          <TextField
            {...params}
            label="銘柄を選んでください"
            value={ticker}
            variant="outlined"
            onChange={TickerHandleChange}
          />
        }
      />
      <FormHelperText>Ticker Symbol</FormHelperText>

      <TextField
        className={classes.margin}
        id="native-select"
        type="number"
        value={quantity}
        InputProps={{ inputProps: { min: 0 } }}
        onChange={QuantityHandleChange}
        />
      <FormHelperText>Quantity</FormHelperText>

      <Button
        className={classes.button}
        type="button"
        variant="outlined"
        color="primary"
      >
        登録
      </Button>
    </div>
  );
}