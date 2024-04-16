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
        <OutlinedInput // currently not showing scroll bar due to https://github.com/swagger-api/apidom/issues/4027
          fullWidth
          multiline
          id="input"
          sx={{
            '.MuiInputBase-inputMultiline': {
              height: 'calc(100vh - 64px - 190px - 80px)',
              maxHeight: 'calc(100vh - 64px - 190px - 80px)',
              display: 'block',
            },
          }}
          value={source}
          onChange={handleEditorChange}
          inputProps={{
            style: {
              height: 'calc(100vh - 64px - 190px - 80px)',
            },
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
