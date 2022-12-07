import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const clientIdTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_KAFKA_OPERATION_BINDING_FIELD_CLIENT_ID_TYPE,
  source: 'apilint',
  message: 'clientId must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['schema'],
  marker: 'value',
  target: 'clientId',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.2.0']],
    },
  ],
};

export default clientIdTypeLint;
