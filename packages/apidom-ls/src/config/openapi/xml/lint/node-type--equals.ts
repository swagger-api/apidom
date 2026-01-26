import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const nodeTypeEqualsLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_XML_FIELD_NODE_TYPE_EQUALS,
  source: 'apilint',
  message: "'nodeType' must be one of allowed values: element, attribute, text, cdata, none",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['element', 'attribute', 'text', 'cdata', 'none']],
  marker: 'value',
  target: 'nodeType',
  data: {},
  targetSpecs: OpenAPI32,
};

export default nodeTypeEqualsLint;
