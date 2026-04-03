import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const responseTopicFormatURILint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MQTT_MESSAGE_BINDING_FIELD_RESPONSE_TOPIC_FORMAT_URI,
  source: 'apilint',
  message: "'responseTopic' must be in the format of a URI",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  linterParams: [true],
  marker: 'value',
  target: 'responseTopic',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
    {
      targets: [{ path: 'responseTopic' }],
      function: 'apilintType',
      params: ['string'],
    },
  ],
};

export default responseTopicFormatURILint;
