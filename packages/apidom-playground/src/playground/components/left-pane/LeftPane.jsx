import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSystemComponent } from 'swagger-adjust';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
  },
  editor: {
    flexGrow: 1,
    display: 'flex',
  },
}));

const LeftPane = ({ className }) => {
  const classes = useStyles();
  const Editor = useSystemComponent('Editor');
  const EditorControls = useSystemComponent('EditorControls');

  return (
    <div className={classNames(className, classes.root)}>
      <Editor className={classes.editor} />
      <EditorControls />
    </div>
  );
};

LeftPane.propTypes = {
  className: PropTypes.string,
};

LeftPane.defaultProps = {
  className: null,
};

export default LeftPane;
