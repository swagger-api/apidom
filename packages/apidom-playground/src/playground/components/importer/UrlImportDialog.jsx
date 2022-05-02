import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSystemActionCreatorBound } from 'swagger-adjust';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const UrlImportDialog = ({ open, onClose }) => {
  const [url, setUrl] = useState('');
  const importURL = useSystemActionCreatorBound('playground', 'importURL');

  const handleURLChange = (event) => {
    setUrl(event.target.value);
  };

  const handleImport = () => {
    importURL(url);
    setUrl('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Import URL</DialogTitle>
      <DialogContent>
        <DialogContentText>Currently supported protocols are HTTP and HTTPs.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="url"
          label="URL"
          type="url"
          fullWidth
          value={url}
          onChange={handleURLChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleImport} color="primary">
          Import
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UrlImportDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UrlImportDialog;
