import React from 'react';
import { useSystemSelector } from 'swagger-adjust';
import MUIBackdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Backdrop = () => {
  const classes = useStyles();
  const open = useSystemSelector('playground', 'selectIsLoading');

  return (
    <div>
      <MUIBackdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </MUIBackdrop>
    </div>
  );
};

export default Backdrop;
