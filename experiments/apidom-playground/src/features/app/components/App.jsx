import React from 'react';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import {
  ThemeProvider,
  makeStyles,
  unstable_createMuiStrictModeTheme, // eslint-disable-line
} from '@material-ui/core/styles';
import AppBar from 'features/app/app-bar/components/AppBar';
import Drawer, { drawerWidth } from 'features/app/drawer/components/Drawer';
import LeftPane from 'features/app/left-pane/components/LeftPane';
import RightPane from 'features/app/right-pane/components/RightPane';
import Backdrop from 'features/app/backdrop/components/Backdrop';

const themeInstance = unstable_createMuiStrictModeTheme();

const useStyles = makeStyles((theme) => {
  return {
    root: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    paper: {
      maxHeight: 'calc(100vh - 64px)',
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1,
    },
    leftPane: {
      flexGrow: 1,
      flexBasis: '50%',
      marginLeft: drawerWidth + theme.spacing(2),
      maxWidth: `calc(50% - ${drawerWidth / 2}px)`,
    },
    rightPane: {
      flexBasis: '50%',
      maxWidth: `calc(50% - ${drawerWidth / 2}px)`,
    },
  };
});

const App = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={themeInstance}>
      <div className={classes.root}>
        <Backdrop />
        <AppBar className={classes.appBar} />
        <Drawer />
        <Paper className={classes.paper} component="main" square>
          <LeftPane className={classes.leftPane} />
          <Divider orientation="vertical" flexItem />
          <RightPane className={classes.rightPane} />
        </Paper>
      </div>
    </ThemeProvider>
  );
};

export default App;
