import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Editor from 'features/app/left-pane/editor/components/Editor';
import EditorControls from 'features/app/left-pane/editor-controls/components/EditorControls';

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
