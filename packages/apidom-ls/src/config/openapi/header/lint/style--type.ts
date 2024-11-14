import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

const styleTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_HEADER_FIELD_STYLE_TYPE,
  source: 'apilint',
  message: 'style must be a string',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'style',
  data: {},
  targetSpecs: OpenAPI3,
};

export default styleTypeLint;
