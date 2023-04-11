import React from 'react';
import { Dialog, DialogTitle } from '@material-ui/core';

const MyDialog = props => {
  const { 
    isOpen = false, 
    onClose = () => {}, 
    title = 'My Dialog', 
    children,
 // eslint-disable-next-line  
    ...rest 
  } = props;

  const handleClose = event => {
    onClose(event);
  };
//fullWidth maxWidth="sm"
  return (
    <Dialog onClose={handleClose} open={isOpen}  >

      <DialogTitle>{title}</DialogTitle>
      {children}
    </Dialog>
  );
}

export default MyDialog;
