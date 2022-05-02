import React, { useState, useRef } from 'react';
import { useSystemActionCreatorBound } from 'swagger-adjust';
import MUISpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { styled } from '@mui/material/styles';

import UrlImportDialog from './UrlImportDialog.jsx';

const SpeedDial = styled(MUISpeedDial)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(10),
  left: theme.spacing(1),
}));

const FileInput = styled('input')({
  display: 'none',
});

const FileImporter = () => {
  const [open, setOpen] = useState(false);
  const [openUrlImportDialog, setUrlImportDialogOpen] = useState(false);
  const fileUploadRef = useRef();
  const setSource = useSystemActionCreatorBound('playground', 'setSource');
  const setBaseURI = useSystemActionCreatorBound('playground', 'setBaseURI');

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
      setBaseURI(window.location.href);
      setSource(source);
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
      <FileInput ref={fileUploadRef} onChange={handleFileUpload} type="file" />
      <UrlImportDialog open={openUrlImportDialog} onClose={handleUrlDialogClose} />
      <SpeedDial
        ariaLabel="Import file"
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
