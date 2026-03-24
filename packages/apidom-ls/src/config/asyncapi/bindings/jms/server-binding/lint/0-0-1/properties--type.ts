import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const propertiesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_JMS_SERVER_BINDING_FIELD_PROPERTIES_TYPE,
  source: 'apilint',
  message: "'properties' must be an array of objects",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfType',
  linterParams: ['object'],
  marker: 'value',
  target: 'properties',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.0.1']],
    },
  ],
};

export default propertiesTypeLint;
