import React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import BlockIcon from '@material-ui/icons/Block';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  clean: {
    marginTop: theme.spacing(1),
  },
  cleanButton: {
    position: 'absolut',
    top: -theme.spacing(5),
  },
}));

const Console = () => {
  const classes = useStyles();

  return (
    <div>
      <TextField
        multiline
        rows={8}
        fullWidth
        label="Console"
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Grid container justify="flex-end" className={classes.clean}>
        <IconButton aria-label="Clear console" size="small" className={classes.cleanButton}>
          <BlockIcon />
        </IconButton>
      </Grid>
    </div>
  );
};

export default Console;
