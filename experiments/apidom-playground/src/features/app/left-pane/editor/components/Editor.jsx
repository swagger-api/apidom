import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
import { selectSource, setSource } from 'features/app/slice';

const useStyles = makeStyles(() => ({
  outlinedInput: {
    height: '100%',
  },
}));

const Editor = ({ className }) => {
  const classes = useStyles();
  const source = useSelector(selectSource);
  const dispatch = useDispatch();

  const handleEditorChange = (event) => {
    dispatch(setSource(event.target.value));
  };

  return (
    <div className={className}>
      <FormControl fullWidth>
        <OutlinedInput
          fullWidth
          multiline
          id="input"
          value={source}
          className={classes.outlinedInput}
          onChange={handleEditorChange}
          inputProps={{
            style: { display: 'block', height: '100%', overflow: 'auto' },
          }}
        />
      </FormControl>
    </div>
  );
};

Editor.propTypes = {
  className: PropTypes.string,
};

Editor.defaultProps = {
  className: null,
};

export default Editor;
