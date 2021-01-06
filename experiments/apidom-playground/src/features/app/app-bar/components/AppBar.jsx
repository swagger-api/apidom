import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const AppBar = () => {
  const classes = useStyles();

  return (
    <MUIAppBar className={classes.root} position="sticky">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          ApiDOM Playground
        </Typography>
      </Toolbar>
    </MUIAppBar>
  );
};

export default AppBar;
