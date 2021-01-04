import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import BlockIcon from '@material-ui/icons/Block';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { selectConsole, clearConsole } from 'features/app/slice';

const useStyles = makeStyles((theme) => ({
  clean: {
    marginTop: theme.spacing(1),
  },
  input: {
    ...theme.typography.caption,
    marginBottom: theme.spacing(1.5),
  },
  cleanButton: {
    position: 'relative',
    left: -theme.spacing(0.6),
    top: -theme.spacing(5),
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
    <div>
      <TextField
        multiline
        rows={8}
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
      <Grid container justify="flex-end" className={classes.clean}>
        <IconButton
          aria-label="Clear console"
          size="small"
          className={classes.cleanButton}
          onClick={handleClearConsole}
        >
          <BlockIcon />
        </IconButton>
      </Grid>
    </div>
  );
};

export default Console;
