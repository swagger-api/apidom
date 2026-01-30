import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const examplesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_PARAMETER_FIELD_EXAMPLES_TYPE,
  source: 'apilint',
  message: 'examples must be an array',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['array'],
  marker: 'value',
  target: 'examples',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default examplesTypeLint;
