import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const timeToLiveTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SOLACE_OPERATION_BINDING_FIELD_TIME_TO_LIVE_TYPE,
  source: 'apilint',
  message: "'timeToLive' must be an integer or a Schema Object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['schema', 'number']],
  marker: 'value',
  target: 'timeToLive',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.4.0']],
    },
  ],
};

export default timeToLiveTypeLint;
