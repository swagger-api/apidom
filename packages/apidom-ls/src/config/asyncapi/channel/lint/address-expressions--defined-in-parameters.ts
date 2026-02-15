import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const addressExpressionsDefinedInParametersLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_CHANNEL_ADDRESS_EXPRESSIONS_DEFINED_IN_PARAMETERS,
  source: 'apilint',
  message: 'all Channel Address Expressions must be defined in parameters',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChannelAddressExpressionsDefinedInParameters',
  linterParams: [],
  marker: 'value',
  target: 'address',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default addressExpressionsDefinedInParametersLint;
