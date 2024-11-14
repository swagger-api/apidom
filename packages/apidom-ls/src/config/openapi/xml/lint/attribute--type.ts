import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI3 } from '../../target-specs.ts';

const attributeTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_XML_FIELD_ATTRIBUTE_TYPE,
  source: 'apilint',
  message: 'attribute must be a boolean',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'attribute',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default attributeTypeLint;
