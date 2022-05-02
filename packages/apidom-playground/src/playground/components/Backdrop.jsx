import React from 'react';
import { useSystemSelector } from 'swagger-adjust';
import MUIBackdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

const StyledMUIBackdrop = styled(MUIBackdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
}));

const Backdrop = () => {
  const open = useSystemSelector('playground', 'selectIsLoading');

  return (
    <div>
      <StyledMUIBackdrop open={open}>
        <CircularProgress color="inherit" />
      </StyledMUIBackdrop>
    </div>
  );
};

export default Backdrop;
