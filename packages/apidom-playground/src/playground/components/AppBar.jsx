import React from 'react';
import MUIAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const StyledMUIAppBar = styled(MUIAppBar)(({ theme }) => {
  return {
    zIndex: theme.zIndex.drawer + 1,
  };
});

const AppBar = () => {
  return (
    <StyledMUIAppBar position="sticky">
      <Toolbar>
        <Typography variant="h6">ApiDOM Playground</Typography>
      </Toolbar>
    </StyledMUIAppBar>
  );
};

export default AppBar;
