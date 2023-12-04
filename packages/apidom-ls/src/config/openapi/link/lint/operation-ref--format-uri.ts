import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const operationRefFormatURILint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_LINK_FIELD_OPERATION_REF_FORMAT_URI,
  source: 'apilint',
  message: "'operationRef' value must be a valid URI-reference",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'operationRef',
  data: {},
  targetSpecs: OpenAPI3,
};

export default operationRefFormatURILint;
