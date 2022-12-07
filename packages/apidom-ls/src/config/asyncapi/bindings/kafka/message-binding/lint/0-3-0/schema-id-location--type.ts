import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

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
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.3.0']],
    },
  ],
};

export default schemaIdLocationTypeLint;
