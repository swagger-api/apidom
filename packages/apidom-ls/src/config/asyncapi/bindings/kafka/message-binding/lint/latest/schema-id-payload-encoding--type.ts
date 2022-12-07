import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const schemaIdPayloadEncodingTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_KAFKA_MESSAGE_BINDING_FIELD_SCHEMA_ID_PAYLOAD_ENCODING_TYPE,
  source: 'apilint',
  message: 'schemaIdPayloadEncoding value must be a string',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'schemaIdPayloadEncoding',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default schemaIdPayloadEncodingTypeLint;
