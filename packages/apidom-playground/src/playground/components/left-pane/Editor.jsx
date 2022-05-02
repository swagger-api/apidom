import React from 'react';
import PropTypes from 'prop-types';
import { useSystemSelector, useSystemActionCreatorBound } from 'swagger-adjust';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';

const Editor = ({ className }) => {
  const source = useSystemSelector('playground', 'selectSource');
  const setSource = useSystemActionCreatorBound('playground', 'setSource');

  const handleEditorChange = (event) => {
    setSource(event.target.value);
  };

  return (
    <div className={className}>
      <FormControl fullWidth>
        <OutlinedInput
          fullWidth
          multiline
          id="input"
          sx={{
            height: '100%',
          }}
          value={source}
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
