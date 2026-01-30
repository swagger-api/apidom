import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const enumTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_PARAMETER_FIELD_ENUM_TYPE,
  source: 'apilint',
  message: 'enum must be an array',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['array'],
  marker: 'value',
  target: 'enum',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default enumTypeLint;
