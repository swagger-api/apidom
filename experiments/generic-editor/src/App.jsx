import React, { PureComponent } from 'react';
import SwaggerUI from 'swagger-ui-react';

import GenericEditorPreset from './plugins/generic-editor';
import SwaggerEditorStandalonePreset from './plugins/standalone';

const editor = (
  <SwaggerUI
    // spec="openapi: 3.1.0\n  info: \n    version: 1.0"
    presets={[SwaggerEditorStandalonePreset, GenericEditorPreset]}
    layout="StandaloneLayout"
    url="https://gist.githubusercontent.com/frantuma/ebc0291737608ab2568c4942b26b5c9d/raw/2f63d1b46d998093a77664a06b268aaf57944157/openapi_validation.yaml"
  />
);

export default class App extends PureComponent {
  render() {
    return editor;
  }
}
