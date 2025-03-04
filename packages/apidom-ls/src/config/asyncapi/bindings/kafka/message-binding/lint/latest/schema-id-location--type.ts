import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const schemaIdLocationTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_KAFKA_MESSAGE_BINDING_FIELD_SCHEMA_ID_LOCATION_TYPE,
  source: 'apilint',
  message: 'schemaIdLocation value must be a string',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'schemaIdLocation',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default schemaIdLocationTypeLint;
