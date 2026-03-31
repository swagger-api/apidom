import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../../../../target-specs.ts';

const topicTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SNS_OPERATION_BINDING_FIELD_TOPIC_TYPE,
  source: 'apilint',
  message: "'topic' value must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['object'],
  marker: 'value',
  target: 'topic',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.2.0']],
    },
  ],
  targetSpecs: AsyncAPI2,
};

export default topicTypeLint;
