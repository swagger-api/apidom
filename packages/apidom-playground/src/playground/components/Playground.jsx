import React from 'react';
import { useSystemComponent, useSystem } from 'swagger-adjust';
import MUIBox from '@mui/material/Box';
import MUIPaper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

const Box = styled(MUIBox)({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const Paper = styled(MUIPaper)({
  maxHeight: 'calc(100vh - 64px)',
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 1,
});

const styledLeftPane =
  (component) =>
  ({ drawerWidth }) =>
    styled(component)(({ theme }) => ({
      flexGrow: 1,
      flexBasis: '50%',
      marginLeft: drawerWidth + parseInt(theme.spacing(2), 10),
      maxWidth: `calc(50% - ${drawerWidth / 2}px)`,
    }));

const styledRightPane =
  (component) =>
  ({ drawerWidth }) =>
    styled(component)({
      flexBasis: '50%',
      maxWidth: `calc(50% - ${drawerWidth / 2}px)`,
    });

const Playground = () => {
  const { drawerWidth } = useSystem();
  const Backdrop = useSystemComponent('Backdrop');
  const AppBar = useSystemComponent('AppBar');
  const Drawer = useSystemComponent('Drawer');
  const LeftPane = styledLeftPane(useSystemComponent('LeftPane'))({ drawerWidth });
  const RightPane = styledRightPane(useSystemComponent('RightPane'))({ drawerWidth });

  return (
    <Box>
      <Backdrop />
      <AppBar />
      <Drawer />
      <Paper component="main" square>
        <LeftPane />
        <Divider orientation="vertical" flexItem />
        <RightPane />
      </Paper>
    </Box>
  );
};

export default Playground;
