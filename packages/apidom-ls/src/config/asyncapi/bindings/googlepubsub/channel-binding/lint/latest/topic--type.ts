import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const topicTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_GOOGLEPUBSUB_CHANNEL_BINDING_FIELD_TOPIC_TYPE,
  source: 'apilint',
  message: "'topic' value must be an string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'topic',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default topicTypeLint;
