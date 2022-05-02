import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSystemComponent } from 'swagger-adjust';
import MUIBox from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import MUIIconButton from '@mui/material/IconButton';
import LaunchIcon from '@mui/icons-material/Launch';
import { styled } from '@mui/material/styles';

const Box = styled(MUIBox)(({ theme }) => ({
  ...theme.typography.body2,
}));

const IconButton = styled(MUIIconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(-1),
  bottom: theme.spacing(0),
}));

const ApiDOM = ({ apiDOM }) => {
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
      sx={{
        fontSize: '1rem',
        flexGrow: 1,
        flexDirection: 'column',
        p: 1.5,
        pt: 2,
        pb: 0,
        border: '1px solid #A3A3A3',
        borderRadius: 1,
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          flexDirection: 'column',
          flexGrow: 1,
          overflow: 'auto',
          whiteSpace: 'pre',
        }}
        dangerouslySetInnerHTML={{ __html: apiDOM }}
      />
      <Box sx={{ minHeight: 28, position: 'relative' }}>
        <Tooltip title="Interpret ApiDOM">
          <IconButton
            aria-label="Interpret ApiDOM"
            size="small"
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
