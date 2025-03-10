import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const enumTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_HEADER_FIELD_ENUM_TYPE,
  source: 'apilint',
  message: 'enum must be an array',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['array'],
  marker: 'value',
  target: 'enum',
  data: {},
  targetSpecs: OpenAPI2,
};

export default enumTypeLint;
