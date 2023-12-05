import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const bearerFormatTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_SECURITY_SCHEME_FIELD_BEARER_FORMAT_TYPE,
  source: 'apilint',
  message: 'bearerFormat must be a string',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'bearerFormat',
  data: {},
  targetSpecs: OpenAPI3,
};

export default bearerFormatTypeLint;
