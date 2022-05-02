import React, { useRef, useEffect } from 'react';
import { useSystemSelector, useSystemActionCreatorBound } from 'swagger-adjust';
import TextField from '@mui/material/TextField';
import MUIIconButton from '@mui/material/IconButton';
import BlockIcon from '@mui/icons-material/Block';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const IconButton = styled(MUIIconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(2.6),
  bottom: theme.spacing(2),
}));

const Console = () => {
  const consoleContent = useSystemSelector('playground', 'selectConsole');
  const clearConsole = useSystemActionCreatorBound('playground', 'clearConsole');
  const inputRef = useRef();

  useEffect(() => {
    const { current: textarea } = inputRef;
    textarea.scrollTop = textarea.scrollHeight;
  }, [consoleContent]);

  const handleClearConsole = () => {
    clearConsole();
  };

  return (
    <>
      <TextField
        multiline
        rows={7}
        fullWidth
        label="Console"
        variant="outlined"
        value={consoleContent}
        inputRef={inputRef}
        InputProps={{
          readOnly: true,
          sx: (theme) => ({
            height: 190.5,
            ...theme.typography.caption,
            marginBottom: 0,
          }),
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Tooltip title="Clear console">
        <IconButton aria-label="Clear console" size="small" onClick={handleClearConsole}>
          <BlockIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default Console;
