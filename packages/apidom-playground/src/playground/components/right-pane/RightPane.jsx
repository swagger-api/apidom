import React from 'react';
import PropTypes from 'prop-types';
import { useSystemComponent, useSystemSelector } from 'swagger-adjust';
import MUIBox from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const Box = styled(MUIBox)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: theme.spacing(2),
}));

const RightPane = ({ className }) => {
  const apiDOM = useSystemSelector('playground', 'selectApiDOMInterpretation');
  const ApiDOM = useSystemComponent('ApiDOM');
  const Console = useSystemComponent('Console');

  return (
    <Box className={className}>
      <ApiDOM apiDOM={apiDOM} />
      <Box
        sx={{
          mt: 2,
          mb: 0,
          ml: 0,
          mr: 0,
        }}
      >
        <Console />
      </Box>
    </Box>
  );
};

RightPane.propTypes = {
  className: PropTypes.string,
};

export default RightPane;
