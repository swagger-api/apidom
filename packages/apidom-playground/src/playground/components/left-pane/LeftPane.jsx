import React from 'react';
import PropTypes from 'prop-types';
import { useSystemComponent } from 'swagger-adjust';
import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: theme.spacing(2),
}));

const styledEditor = (component) =>
  styled(component)({
    flexGrow: 1,
    display: 'flex',
  });

const LeftPane = ({ className }) => {
  const Editor = styledEditor(useSystemComponent('Editor'));
  const EditorControls = useSystemComponent('EditorControls');

  return (
    <Root className={className}>
      <Editor />
      <EditorControls />
    </Root>
  );
};

LeftPane.propTypes = {
  className: PropTypes.string,
};

export default LeftPane;
