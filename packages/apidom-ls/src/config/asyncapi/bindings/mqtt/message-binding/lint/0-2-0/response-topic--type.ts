import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const responseTopicTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MQTT_MESSAGE_BINDING_FIELD_RESPONSE_TOPIC_TYPE,
  source: 'apilint',
  message: "'responseTopic' must be a string or a Schema Object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['schema', 'string']],
  marker: 'value',
  target: 'responseTopic',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.2.0']],
    },
  ],
};

export default responseTopicTypeLint;
