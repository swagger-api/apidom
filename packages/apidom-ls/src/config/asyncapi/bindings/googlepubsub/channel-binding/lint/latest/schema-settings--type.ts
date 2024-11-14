import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const schemaSettingsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_GOOGLEPUBSUB_CHANNEL_BINDING_FIELD_MESSAGE_SCHEMA_SETTINGS_TYPE,
  source: 'apilint',
  message: "'schemaSettings' value must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['object'],
  marker: 'value',
  target: 'schemaSettings',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default schemaSettingsTypeLint;
