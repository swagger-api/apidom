import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const schemaLookupStrategyTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_KAFKA_MESSAGE_BINDING_FIELD_SCHEMA_LOOKUP_STRATEGY_TYPE,
  source: 'apilint',
  message: 'schemaLookupStrategy value must be a string',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'schemaLookupStrategy',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.3.0']],
    },
  ],
};

export default schemaLookupStrategyTypeLint;
