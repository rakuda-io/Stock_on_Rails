import React, { useEffect, useState, useReducer, } from 'react';
import { DialogContent, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
// import Select from 'react-select';
import { fetchStocks } from '../apis/stocks';
import { initialState, holdingsActionTypes, stocksReducer } from '../reducers/stocks';
import { REQUEST_STATE } from '../constants';
import { CustomizedSelects } from './SelectBox';



export const AddDialog = ({
  isOpen,
  doClose,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={doClose}
    >
      <DialogTitle>
        保有株編集
      </DialogTitle>
      <DialogContent style={{height: 300, width: 300}}>
        <CustomizedSelects />
      </DialogContent>
      <DialogActions>
      </DialogActions>
    </Dialog>
  )
}