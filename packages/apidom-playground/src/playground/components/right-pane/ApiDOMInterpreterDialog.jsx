import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useSystemSelector, useSystemActionCreatorBound } from 'swagger-adjust';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(
  (props, ref) => <Slide direction="up" ref={ref} {...props} /> // eslint-disable-line react/jsx-props-no-spreading
);

const ApiDOMInterpreterDialog = ({ open, onClose }) => {
  const classes = useStyles();
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
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Interpret ApiDOM
          </Typography>
          <Button autoFocus color="inherit" onClick={handleInterpret}>
            Interpret
          </Button>
        </Toolbar>
      </AppBar>
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
