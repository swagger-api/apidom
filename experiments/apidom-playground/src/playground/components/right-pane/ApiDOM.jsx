import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSystemComponent } from 'swagger-adjust';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import LaunchIcon from '@material-ui/icons/Launch';

/* eslint-disable react/no-danger */

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: '1rem',
  },
  launchButtonTooltip: {
    position: 'absolute',
    right: theme.spacing(-1),
    bottom: theme.spacing(0),
  },
}));

const ApiDOM = ({ apiDOM }) => {
  const classes = useStyles();
  const ApiDOMInterpreterDialog = useSystemComponent('ApiDOMInterpreterDialog');
  const [openInterpreterDialog, setInterpreterDialogOpen] = useState(false);

  const handleInterpreterDialogOpen = () => {
    setInterpreterDialogOpen(true);
  };

  const handleInterpreterDialogClose = () => {
    setInterpreterDialogOpen(false);
  };

  return (
    <Box
      flexGrow="1"
      flexDirection="column"
      className={classes.root}
      borderColor="grey.400"
      p={1.5}
      pt={2}
      pb={0}
      borderRadius="borderRadius"
      border={1}
      display="flex"
      overflow="hidden"
    >
      <Box
        flexDirection="column"
        flexGrow="1"
        overflow="auto"
        whiteSpace="pre"
        dangerouslySetInnerHTML={{ __html: apiDOM }}
      />
      <Box minHeight={28} position="relative">
        <Tooltip title="Interpret ApiDOM">
          <IconButton
            aria-label="Interpret ApiDOM"
            size="small"
            className={classes.launchButtonTooltip}
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
    </Box>
  );
};

ApiDOM.propTypes = {
  apiDOM: PropTypes.string.isRequired,
};

export default React.memo(ApiDOM);
