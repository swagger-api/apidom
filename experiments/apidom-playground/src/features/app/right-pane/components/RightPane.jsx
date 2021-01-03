import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ApiDOM from 'features/app/right-pane/apidom/components/ApiDOM';
import Console from 'features/app/right-pane/console/components/Console';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
}));

const RightPane = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ApiDOM />
      <Box mt={2}>
        <Console />
      </Box>
    </div>
  );
};

export default RightPane;
