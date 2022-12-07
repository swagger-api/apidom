import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const keyTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_KAFKA_MESSAGE_BINDING_FIELD_KEY_TYPE,
  source: 'apilint',
  message: 'key must be an object (Schema or AVRO Schema)',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['schema'],
  marker: 'value',
  target: 'key',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.3.0']],
    },
  ],
};

export default keyTypeLint;
