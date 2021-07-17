import React, { useEffect, useState, useReducer, } from 'react';
import { DialogContent, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import Select from 'react-select';
import { fetchStocks } from '../apis/stocks';
import { initialState, holdingsActionTypes, stocksReducer } from '../reducers/stocks';
import { REQUEST_STATE } from '../constants';


export const AddDialog = ({
  isOpen,
  doClose,
}) => {
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

  const option = []
  if(stocksState.fetchState === REQUEST_STATE.OK) {
    const map = new Map()
    const tmp = Object.entries(stocksState.stocksList).map(([key, value]) => ({key, value}))
    map.set(tmp[0]['value']['stocks'], tmp[0]['value']['stocks'])
    const stocks = Array.from(map)
    // console.log(aaa[0][0])
    stocks[0][0].map((ticker, index) => {
      option.push({ value: index, label: ticker})
    })
  }

  return (
    <Dialog
      open={isOpen}
      onClose={doClose}
    >
      <DialogTitle>
        保有株編集
      </DialogTitle>
      <DialogContent style={{height: 200, width: 200}}>
        銘柄
        <Select options={option} />
        {/* 購入数
        <Select options={option} /> */}
      </DialogContent>
      <DialogActions>
      </DialogActions>
    </Dialog>
  )
}