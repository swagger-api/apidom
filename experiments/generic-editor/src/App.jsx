import React, { PureComponent } from 'react';
import SwaggerUI from 'swagger-ui-react';

// import GenericEditorPreset from './plugins/generic-editor'; // EditorLayout
// import SwaggerEditorStandalonePreset from './plugins/standalone';
import ideLayoutPreset from './plugins/ideLayout';

const editor = (
  <SwaggerUI
    presets={[ideLayoutPreset]}
    layout="IdeLayout" // prev, StandaloneLayout
    // url="https://petstore.swagger.io/v2/swagger.json"
    url="https://petstore3.swagger.io/api/v3/openapi.yaml"
  />
);

export default class App extends PureComponent {
  render() {
    return editor;
  }
}
