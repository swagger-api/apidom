import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import BlockIcon from '@material-ui/icons/Block';
import { makeStyles } from '@material-ui/core/styles';
import { selectConsole, clearConsole } from 'features/app/slice';

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
  const consoleContent = useSelector(selectConsole);
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    const { current: textarea } = inputRef;
    textarea.scrollTop = textarea.scrollHeight;
  }, [consoleContent]);

  const handleClearConsole = () => {
    dispatch(clearConsole());
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
      <IconButton
        aria-label="Clear console"
        size="small"
        className={classes.cleanButton}
        onClick={handleClearConsole}
      >
        <BlockIcon />
      </IconButton>
    </>
  );
};

export default Console;
