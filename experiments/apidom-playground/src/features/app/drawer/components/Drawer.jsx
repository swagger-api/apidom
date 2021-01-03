import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIDrawer from '@material-ui/core/Drawer';
import FileImporter from 'features/app/file-importer/components/FileImporter';

export const drawerWidth = 73;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
}));

const Drawer = () => {
  const classes = useStyles();

  return (
    <MUIDrawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <FileImporter />
    </MUIDrawer>
  );
};

export default Drawer;
