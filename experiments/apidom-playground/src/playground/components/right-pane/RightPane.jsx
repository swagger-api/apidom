import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSystemComponent, useSystemSelector } from 'swagger-adjust';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
  },
}));

const RightPane = ({ className }) => {
  const classes = useStyles();
  const apiDOM = useSystemSelector('playground', 'selectApiDOMInterpretation');
  const ApiDOM = useSystemComponent('ApiDOM');
  const Console = useSystemComponent('Console');

  return (
    <div className={classNames(classes.root, className)}>
      <ApiDOM apiDOM={apiDOM} />
      <Box mt={2} mb={0} pt={1}>
        <Console />
      </Box>
    </div>
  );
};

RightPane.propTypes = {
  className: PropTypes.string,
};

RightPane.defaultProps = {
  className: null,
};

export default RightPane;
