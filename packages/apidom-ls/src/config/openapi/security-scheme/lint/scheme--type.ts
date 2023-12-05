import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const schemeTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_SECURITY_SCHEME_FIELD_SCHEME_TYPE,
  source: 'apilint',
  message: 'scheme must be a string',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'scheme',
  data: {},
  targetSpecs: OpenAPI3,
};

export default schemeTypeLint;
