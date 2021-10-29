import React from 'react';
import { useSystemComponent, useSystem } from 'swagger-adjust';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import {
  ThemeProvider,
  makeStyles,
  unstable_createMuiStrictModeTheme, // eslint-disable-line
} from '@material-ui/core/styles';

const themeInstance = unstable_createMuiStrictModeTheme();

const useStyles = makeStyles((theme) => ({
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
  leftPane: ({ drawerWidth }) => ({
    flexGrow: 1,
    flexBasis: '50%',
    marginLeft: drawerWidth + theme.spacing(2),
    maxWidth: `calc(50% - ${drawerWidth / 2}px)`,
  }),
  rightPane: ({ drawerWidth }) => ({
    flexBasis: '50%',
    maxWidth: `calc(50% - ${drawerWidth / 2}px)`,
  }),
}));

const Playground = () => {
  const { drawerWidth } = useSystem();
  const classes = useStyles({ drawerWidth });
  const Backdrop = useSystemComponent('Backdrop');
  const AppBar = useSystemComponent('AppBar');
  const Drawer = useSystemComponent('Drawer');
  const LeftPane = useSystemComponent('LeftPane');
  const RightPane = useSystemComponent('RightPane');

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

export default Playground;
