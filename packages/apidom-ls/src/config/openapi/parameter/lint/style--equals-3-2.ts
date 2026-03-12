import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const styleEquals3_2Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_PARAMETER_FIELD_STYLE_EQUALS,
  source: 'apilint',
  message:
    "'style' must be one of allowed values: matrix, label, simple, form, spaceDelimited, pipeDelimited, deepObject, cookie",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [
    [
      'matrix',
      'label',
      'simple',
      'form',
      'spaceDelimited',
      'pipeDelimited',
      'deepObject',
      'cookie',
    ],
  ],
  marker: 'value',
  target: 'style',
  data: {},
  targetSpecs: OpenAPI32,
};

export default styleEquals3_2Lint;
