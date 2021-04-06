import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSystemActionCreatorBound } from 'swagger-adjust';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
