import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

/* eslint-disable react/no-danger */

const useStyles = makeStyles(() => ({
  root: {
    fontSize: '1rem',
  },
}));

const ApiDOM = ({ apiDOM }) => {
  const classes = useStyles();

  return (
    <Box
      className={classes.root}
      borderColor="grey.400"
      p={1.5}
      pt={2}
      borderRadius="borderRadius"
      border={1}
      height="100%"
      whiteSpace="pre"
      overflow="auto"
      dangerouslySetInnerHTML={{ __html: apiDOM }}
    />
  );
};

ApiDOM.propTypes = {
  apiDOM: PropTypes.string.isRequired,
};

export default React.memo(ApiDOM);
