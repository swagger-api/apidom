import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import DescriptionIcon from '@material-ui/icons/Description';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import { setBaseURI, setSource } from 'features/app/slice';
import UrlImportDialog from 'features/app/file-importer/url-import-dialog/components/UrlImportDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: theme.spacing(10),
    left: theme.spacing(1),
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
      dispatch(setSource(source));
      dispatch(setBaseURI(''));
    };

    reader.onloadend = onloadend;
    reader.readAsText(file);
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
        style={{ display: 'none' }}
        ref={fileUploadRef}
        onChange={handleFileUpload}
        type="file"
      />
      <UrlImportDialog open={openUrlImportDialog} onClose={handleUrlDialogClose} />
      <SpeedDial
        ariaLabel="Import file"
        className={classes.root}
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
