import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const prefixEncodingTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_MEDIA_TYPE_FIELD_PREFIX_ENCODING_TYPE,
  source: 'apilint',
  message: "'prefixEncoding' must be an array of Encoding Objects",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['encoding']],
  marker: 'value',
  target: 'prefixEncoding',
  data: {},
  targetSpecs: OpenAPI32,
};

export default prefixEncodingTypeLint;
