import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import DescriptionIcon from '@material-ui/icons/Description';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import { setSource, setBaseURI } from 'features/app/slice';
import UrlImportDialog from 'features/app/file-importer/url-import-dialog/components/UrlImportDialog';

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: 'absolute',
    top: theme.spacing(10),
    left: theme.spacing(1),
  },
  fileInput: {
    display: 'none',
  },
}));

const FileImporter = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openUrlImportDialog, setUrlImportDialogOpen] = useState(false);
  const fileUploadRef = useRef();
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileUploadClick = () => {
    fileUploadRef.current.click();
    handleClose();
  };

  const handleFileUpload = (event) => {
    const [file] = event.target.files;
    const reader = new FileReader();
    const onloadend = (onloadendEvent) => {
      const source = onloadendEvent.target.result;
      dispatch(setBaseURI(window.location.href));
      dispatch(setSource(source));
    };

    reader.onloadend = onloadend;
    reader.readAsText(file);
    // eslint-disable-next-line no-param-reassign
    event.target.value = '';
  };

  const handleUrlDialogOpen = () => {
    setUrlImportDialogOpen(true);
  };

  const handleUrlDialogClose = () => {
    setUrlImportDialogOpen(false);
    handleClose();
  };

  return (
    <>
      <input
        className={classes.fileInput}
        ref={fileUploadRef}
        onChange={handleFileUpload}
        type="file"
      />
      <UrlImportDialog open={openUrlImportDialog} onClose={handleUrlDialogClose} />
      <SpeedDial
        ariaLabel="Import file"
        className={classes.speedDial}
        icon={<SpeedDialIcon openIcon={<DescriptionIcon />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="down"
      >
        <SpeedDialAction
          key="Import URL"
          icon={<ImportExportIcon />}
          tooltipTitle="Import URL"
          onClick={handleUrlDialogOpen}
        />
        <SpeedDialAction
          key="Attach file"
          icon={<AttachFileIcon />}
          tooltipTitle="Attach file"
          onClick={handleFileUploadClick}
        />
      </SpeedDial>
    </>
  );
};

export default FileImporter;
