import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI30, OpenAPI31 } from '../../target-specs.ts';

const styleEqualsLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_PARAMETER_FIELD_STYLE_EQUALS,
  source: 'apilint',
  message: 'style must be one of allowed values: form, simple',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['form', 'simple']],
  marker: 'value',
  target: 'style',
  data: {},
  targetSpecs: [...OpenAPI30, ...OpenAPI31],
};

export default styleEqualsLint;
