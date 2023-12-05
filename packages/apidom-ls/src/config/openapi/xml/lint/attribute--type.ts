import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const attributeTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_XML_FIELD_ATTRIBUTE_TYPE,
  source: 'apilint',
  message: 'attribute must be a boolean',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'attribute',
  data: {},
  targetSpecs: OpenAPI3,
};

export default attributeTypeLint;
