import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { selectSource, setSource } from 'features/app/slice';

const Editor = () => {
  const source = useSelector(selectSource);
  const dispatch = useDispatch();

  const handleEditorChange = (event) => {
    dispatch(setSource(event.target.value));
  };

  return (
    <TextField
      multiline
      rows={28}
      value={source}
      onChange={handleEditorChange}
      fullWidth
      variant="outlined"
    />
  );
};

export default Editor;
