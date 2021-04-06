import React, { useRef, useEffect } from 'react';
import { useSystemSelector, useSystemActionCreatorBound } from 'swagger-adjust';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import BlockIcon from '@material-ui/icons/Block';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  input: {
    ...theme.typography.caption,
    marginBottom: theme.spacing(1.5),
  },
  cleanButton: {
    position: 'absolute',
    right: theme.spacing(2.6),
    bottom: theme.spacing(2),
  },
}));

const Console = () => {
  const classes = useStyles();
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
          classes: {
            input: classes.input,
          },
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Tooltip title="Clear console">
        <IconButton
          aria-label="Clear console"
          size="small"
          className={classes.cleanButton}
          onClick={handleClearConsole}
        >
          <BlockIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default Console;
