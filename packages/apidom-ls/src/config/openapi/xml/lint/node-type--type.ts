import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const nodeTypeTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_XML_FIELD_NODE_TYPE_TYPE,
  source: 'apilint',
  message: 'nodeType must be a string',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'nodeType',
  data: {},
  targetSpecs: OpenAPI32,
};

export default nodeTypeTypeLint;
