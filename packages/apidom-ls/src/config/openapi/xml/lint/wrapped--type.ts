import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI3 } from '../../target-specs';

const wrappedTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_XML_FIELD_WRAPPED_TYPE,
  source: 'apilint',
  message: 'wrapped must be a boolean',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'wrapped',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default wrappedTypeLint;
