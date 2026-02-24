import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const itemEncodingTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_ENCODING_FIELD_ITEM_ENCODING_TYPE,
  source: 'apilint',
  message: 'itemEncoding must be an Encoding Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['encoding']],
  marker: 'value',
  target: 'itemEncoding',
  data: {},
  targetSpecs: OpenAPI32,
};

export default itemEncodingTypeLint;
