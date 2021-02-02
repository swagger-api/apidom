import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import {
  selectBaseURI,
  selectMediaType,
  selectSource,
  selectApiDOM,
  selectCanParse,
  selectCanResolve,
  selectCanDereference,
  setMediaType,
  setBaseURI,
  parseSource,
  resolveApiDOM,
  dereferenceApiDOM,
} from 'features/app/slice';
import DereferenceDialog from 'features/app/dereference/components/DereferenceDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
  },
  formControl: {
    width: '100%',
  },
  buttons: {
    marginTop: theme.spacing(2),
  },
}));

const EditorControls = () => {
  const classes = useStyles();
  const baseURI = useSelector(selectBaseURI);
  const mediaType = useSelector(selectMediaType);
  const canParse = useSelector(selectCanParse);
  const canResolve = useSelector(selectCanResolve);
  const canDereference = useSelector(selectCanDereference);
  const source = useSelector(selectSource);
  const apiDOM = useSelector(selectApiDOM);
  const dispatch = useDispatch();
  const [mediaTypeSelectOpen, setMediaTypeSelectOpen] = useState(false);
  const [dereferenceDialogOpen, setDeferenceDialogOpen] = useState(false);

  const handleMediaTypeChange = (event) => {
    dispatch(setMediaType(event.target.value));
  };
  const handleBaseURIChange = (event) => {
    dispatch(setBaseURI(event.target.value));
  };
  const handleMediaTypeClose = () => {
    setMediaTypeSelectOpen(false);
  };
  const handleMediaTypeOpen = () => {
    setMediaTypeSelectOpen(true);
  };
  const handleSourceParse = () => {
    dispatch(parseSource({ source, mediaType }));
  };
  const handleApiDOMResolve = () => {
    dispatch(resolveApiDOM({ source, apiDOM, mediaType, baseURI }));
  };
  const handleApiDOMDereferenceDialogOpen = () => {
    setDeferenceDialogOpen(true);
  };
  const handleApiDOMDereferenceDialogClose = () => {
    setDeferenceDialogOpen(false);
  };
  const handleApiDOMDereference = () => {
    handleApiDOMDereferenceDialogOpen();
    dispatch(dereferenceApiDOM({ source, apiDOM, mediaType, baseURI }));
  };

  return (
    <Paper variant="outlined" className={classes.root}>
      <form noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField fullWidth label="Base URI" onChange={handleBaseURIChange} value={baseURI} />
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="media-type-label">Media Type</InputLabel>
              <Select
                labelId="media-type-label"
                id="media-type"
                open={mediaTypeSelectOpen}
                fullWidth
                onClose={handleMediaTypeClose}
                onOpen={handleMediaTypeOpen}
                value={mediaType}
                onChange={handleMediaTypeChange}
              >
                <MenuItem value="application/json">application/json</MenuItem>
                <MenuItem value="application/yaml">application/yaml</MenuItem>
                <MenuItem value="text/yaml">text/yaml</MenuItem>
                <MenuItem value="application/vnd.oai.openapi;version=3.1.0">
                  application/vnd.oai.openapi;version=3.1.0
                </MenuItem>
                <MenuItem value="application/vnd.oai.openapi+json;version=3.1.0">
                  application/vnd.oai.openapi+json;version=3.1.0
                </MenuItem>
                <MenuItem value="application/vnd.oai.openapi+yaml;version=3.1.0">
                  application/vnd.oai.openapi+yaml;version=3.1.0
                </MenuItem>
                <MenuItem value="application/vnd.aai.asyncapi;version=2.0.0">
                  application/vnd.aai.asyncapi;version=2.0.0
                </MenuItem>
                <MenuItem value="application/vnd.aai.asyncapi+json;version=2.0.0">
                  application/vnd.aai.asyncapi+json;version=2.0.0
                </MenuItem>
                <MenuItem value="application/vnd.aai.asyncapi+yaml;version=2.0.0">
                  application/vnd.aai.asyncapi+yaml;version=2.0.0
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </form>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.buttons}
      >
        <Grid item>
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button disabled={!canParse} onClick={handleSourceParse}>
              Parse
            </Button>
            <Button disabled={!canResolve} onClick={handleApiDOMResolve}>
              Resolve
            </Button>
            <Button disabled={!canDereference} onClick={handleApiDOMDereference}>
              Dereference
            </Button>
            <DereferenceDialog
              onClose={handleApiDOMDereferenceDialogClose}
              open={dereferenceDialogOpen}
            />
          </ButtonGroup>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EditorControls;
