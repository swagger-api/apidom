import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Editor from 'features/app/left-pane/editor/components/Editor';
import EditorControls from 'features/app/left-pane/editor-controls/components/EditorControls';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
}));

const LeftPane = ({ className }) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <Editor />
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
