import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import LaunchIcon from '@material-ui/icons/Launch';
import ApiDOMInterpreterDialog from 'features/app/right-pane/apidom/apidom-interpreter-dialog/components/ApiDOMInterpreterDialog';

/* eslint-disable react/no-danger */

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: '1rem',
    position: 'relative',
  },
  launchButton: {
    position: 'absolute',
    right: theme.spacing(0.5),
    bottom: theme.spacing(0),
  },
}));

const ApiDOM = ({ apiDOM }) => {
  const classes = useStyles();
  const [openInterpreterDialog, setInterpreterDialogOpen] = useState(false);

  const handleInterpreterDialogOpen = () => {
    setInterpreterDialogOpen(true);
  };

  const handleInterpreterDialogClose = () => {
    setInterpreterDialogOpen(false);
  };

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
    >
      <Box height="100%" dangerouslySetInnerHTML={{ __html: apiDOM }} />
      <Tooltip title="Interpret ApiDOM">
        <IconButton
          aria-label="Interpret ApiDOM"
          size="small"
          className={classes.launchButton}
          onClick={handleInterpreterDialogOpen}
        >
          <LaunchIcon />
        </IconButton>
      </Tooltip>
      <ApiDOMInterpreterDialog
        onClose={handleInterpreterDialogClose}
        open={openInterpreterDialog}
      />
    </Box>
  );
};

ApiDOM.propTypes = {
  apiDOM: PropTypes.string.isRequired,
};

export default React.memo(ApiDOM);
