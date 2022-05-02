import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useSystemSelector, useSystemActionCreatorBound } from 'swagger-adjust';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const Title = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  flex: 1,
}));

const Transition = React.forwardRef(
  (props, ref) => <Slide direction="up" ref={ref} {...props} /> // eslint-disable-line react/jsx-props-no-spreading
);

const ApiDOMInterpreterDialog = ({ open, onClose }) => {
  const inputRef = useRef();
  const interpreter = useSystemSelector('playground', 'selectInterpreter');
  const interpretApiDOM = useSystemActionCreatorBound('playground', 'interpretApiDOM');

  const handleInterpret = () => {
    interpretApiDOM(inputRef.current.value);
    onClose();
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      TransitionComponent={Transition}
    >
      <AppBar>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Title variant="h6">Interpret ApiDOM</Title>
          <Button autoFocus color="inherit" onClick={handleInterpret}>
            Interpret
          </Button>
        </Toolbar>
      </AppBar>
      <Offset />
      <DialogContent>
        <FormControl fullWidth>
          <OutlinedInput
            inputRef={inputRef}
            fullWidth
            rows={20}
            multiline
            defaultValue={interpreter}
            id="interpret-input"
            placeholder="(element) => { return element.element }"
          />
        </FormControl>
        <Typography variant="caption" display="block" color="textSecondary" gutterBottom>
          Interpreter function is a pure function that receives an Element instance and returns
          string representation of an Element.
        </Typography>
        <Typography variant="caption" display="block" color="textSecondary" gutterBottom>
          There are also couple of pre-defined handy interpreters: <strong>s-expression</strong>,{' '}
          <strong>to-value</strong>
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

ApiDOMInterpreterDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ApiDOMInterpreterDialog;
