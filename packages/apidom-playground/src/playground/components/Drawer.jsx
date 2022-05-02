import React from 'react';
import { useSystemComponent } from 'swagger-adjust';
import MUIDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

export const drawerWidth = 73;

const StyledMUIDrawer = styled(MUIDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    flexShrink: 0,
  },
});

const Toolbar = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Drawer = () => {
  const FileImporter = useSystemComponent('FileImporter');

  return (
    <StyledMUIDrawer variant="permanent" anchor="left">
      <Toolbar />
      <FileImporter />
    </StyledMUIDrawer>
  );
};

export default Drawer;
