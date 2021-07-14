import React from 'react';
import { DialogContent, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

export const AddDialog = ({
  isOpen,
  doClose,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={doClose}
    >
      <DialogContent>
        追加購入関連の処理をこれから書く
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={() => }>
          ++
        </Button> */}
      </DialogActions>
    </Dialog>
  )
}