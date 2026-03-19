import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const topicConfigurationTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_KAFKA_CHANNEL_BINDING_FIELD_TOPIC_CONFIGURATION_TYPE,
  source: 'apilint',
  message: "'topicConfiguration' value must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['object'],
  marker: 'value',
  target: 'topicConfiguration',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.5.0']],
    },
  ],
};

export default topicConfigurationTypeLint;
