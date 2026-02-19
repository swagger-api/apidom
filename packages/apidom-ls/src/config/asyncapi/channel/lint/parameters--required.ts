import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const parametersRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_CHANNEL_PARAMETERS_REQUIRED_WHEN_ADDRESS_HAS_EXPRESSIONS,
  source: 'apilint',
  message: 'parameters field must be present when address contains Channel Address Expressions',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChannelParametersRequiredWhenAddressHasExpressions',
  linterParams: [],
  marker: 'key',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default parametersRequiredLint;
