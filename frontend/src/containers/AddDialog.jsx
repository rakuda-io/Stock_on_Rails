import React from 'react';
import { DialogContent, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
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
      <DialogContent style={{height: 300, width: 270}}>
        <CustomizedSelects />
      </DialogContent>
      <DialogActions>
      </DialogActions>
    </Dialog>
  )
}