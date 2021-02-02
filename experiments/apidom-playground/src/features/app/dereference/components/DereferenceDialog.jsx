import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {
  selectDereferenced,
  selectSource,
  selectApiDOM,
  selectMediaType,
  selectBaseURI,
  humanizeDereferencedApiDOM,
  dereferenceApiDOM,
} from 'features/app/slice';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />; // eslint-disable-line react/jsx-props-no-spreading
});

const ApiDOMInterpreterDialog = ({ open, onClose }) => {
  const [isHumanized, setHumanized] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const inputRef = useRef();
  const source = useSelector(selectSource);
  const apiDOM = useSelector(selectApiDOM);
  const baseURI = useSelector(selectBaseURI);
  const mediaType = useSelector(selectMediaType);
  const dereferenced = useSelector(selectDereferenced);

  const handleHumanization = () => {
    dispatch(humanizeDereferencedApiDOM({ source, mediaType, dereferenced }));
    setHumanized(true);
  };
  const handleDehumanization = () => {
    dispatch(dereferenceApiDOM({ source, mediaType, apiDOM, baseURI }));
    setHumanized(false);
  };
  const handleClose = () => {
    dispatch(dereferenceApiDOM({ source, mediaType, apiDOM, baseURI }));
    setHumanized(false);
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
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Dereferenced ApiDOM
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <FormControl fullWidth>
          <OutlinedInput
            inputRef={inputRef}
            fullWidth
            rows={20}
            multiline
            value={dereferenced}
            readOnly
            id="dereference-input"
            placeholder=""
          />
        </FormControl>
        <Box mt={2}>
          <Grid container item justify="center">
            {isHumanized ? (
              <Button variant="contained" color="primary" onClick={handleDehumanization}>
                Dehumanize
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleHumanization}>
                Humanize
              </Button>
            )}
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

ApiDOMInterpreterDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ApiDOMInterpreterDialog;
