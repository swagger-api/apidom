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
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
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
  const source = useSystemSelector('playground', 'selectSource');
  const apiDOM = useSystemSelector('playground', 'selectApiDOM');
  const baseURI = useSystemSelector('playground', 'selectBaseURI');
  const mediaType = useSystemSelector('playground', 'selectMediaType');
  const dereferenced = useSystemSelector('playground', 'selectDereferenced');
  const interpreter = useSystemSelector('playground', 'selectDereferencedInterpreter');
  const dereferenceApiDOM = useSystemActionCreatorBound('playground', 'dereferenceApiDOM');

  const handleDehydrate = () => {
    dereferenceApiDOM({ source, mediaType, apiDOM, baseURI, interpreter: 'dehydrate' });
  };
  const handleSExpression = () => {
    dereferenceApiDOM({ source, mediaType, apiDOM, baseURI, interpreter: 's-expression' });
  };
  const handleToValue = () => {
    dereferenceApiDOM({ source, mediaType, apiDOM, baseURI, interpreter: 'to-value' });
  };

  const handleClose = () => {
    handleDehydrate();
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
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Title variant="h6">Dereferenced ApiDOM</Title>
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
            value={dereferenced}
            readOnly
            id="dereference-input"
            placeholder=""
          />
        </FormControl>
        <Box mt={2}>
          <Grid container justifyContent="center">
            <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="contained primary button group"
            >
              <Button disabled={interpreter === 'dehydrate'} onClick={handleDehydrate}>
                Dehydrate
              </Button>
              <Button disabled={interpreter === 's-expression'} onClick={handleSExpression}>
                S-expression
              </Button>
              <Button disabled={interpreter === 'to-value'} onClick={handleToValue}>
                Value
              </Button>
            </ButtonGroup>
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
