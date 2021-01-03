import React from 'react';
import { useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { selectApiDOM } from 'features/app/slice';

const ApiDOM = () => {
  const apiDOM = useSelector(selectApiDOM);

  return (
    <TextField
      multiline
      rows={28}
      fullWidth
      value={apiDOM}
      label="ApiDOM"
      variant="outlined"
      InputLabelProps={{
        shrink: true,
        readOnly: true,
      }}
    />
  );
};

export default ApiDOM;
