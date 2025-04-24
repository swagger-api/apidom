import React, { useState } from 'react';
import { useSystemActionCreatorBound, useSystemComponent, useSystemSelector } from 'swagger-adjust';
import MUIPaper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MUIFormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { styled } from '@mui/material/styles';

const Paper = styled(MUIPaper)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1),
}));

const FormControl = styled(MUIFormControl)({
  width: '100%',
});

const EditorControls = () => {
  const baseURI = useSystemSelector('playground', 'selectBaseURI');
  const mediaType = useSystemSelector('playground', 'selectMediaType');
  const canParse = useSystemSelector('playground', 'selectCanParse');
  const canResolve = useSystemSelector('playground', 'selectCanResolve');
  const canDereference = useSystemSelector('playground', 'selectCanDereference');
  const source = useSystemSelector('playground', 'selectSource');
  const apiDOM = useSystemSelector('playground', 'selectApiDOM');
  const mediaTypes = useSystemSelector('playground', 'selectMediaTypes');
  const setMediaType = useSystemActionCreatorBound('playground', 'setMediaType');
  const setBaseURI = useSystemActionCreatorBound('playground', 'setBaseURI');
  const parseSource = useSystemActionCreatorBound('playground', 'parseSource');
  const resolveApiDOM = useSystemActionCreatorBound('playground', 'resolveApiDOM');
  const dereferenceApiDOM = useSystemActionCreatorBound('playground', 'dereferenceApiDOM');
  const DereferenceDialog = useSystemComponent('DereferenceDialog');
  const [mediaTypeSelectOpen, setMediaTypeSelectOpen] = useState(false);
  const [dereferenceDialogOpen, setDeferenceDialogOpen] = useState(false);

  const handleMediaTypeChange = (event) => {
    setMediaType(event.target.value);
  };
  const handleBaseURIChange = (event) => {
    setBaseURI(event.target.value);
  };
  const handleMediaTypeClose = () => {
    setMediaTypeSelectOpen(false);
  };
  const handleMediaTypeOpen = () => {
    setMediaTypeSelectOpen(true);
  };
  const handleSourceParse = () => {
    parseSource({ source, mediaType });
  };
  const handleApiDOMResolve = () => {
    resolveApiDOM({ source, apiDOM, mediaType, baseURI });
  };
  const handleApiDOMDereferenceDialogOpen = () => {
    setDeferenceDialogOpen(true);
  };
  const handleApiDOMDereferenceDialogClose = () => {
    setDeferenceDialogOpen(false);
  };
  const handleApiDOMDereference = () => {
    handleApiDOMDereferenceDialogOpen();
    dereferenceApiDOM({ source, apiDOM, mediaType, baseURI, interpreter: 'dehydrate' });
  };

  return (
    <Paper variant="outlined">
      <form noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              variant="standard"
              label="Base URI"
              onChange={handleBaseURIChange}
              value={baseURI}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControl variant="standard">
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
                {mediaTypes.map((medType) => (
                  <MenuItem key={medType} value={medType}>
                    {medType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </form>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: (theme) => theme.spacing(2) }}
      >
        <Grid>
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
