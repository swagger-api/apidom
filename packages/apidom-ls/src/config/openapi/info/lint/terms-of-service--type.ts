import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const termsOfServiceTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_INFO_FIELD_TERMS_OF_SERVICE_TYPE,
  source: 'apilint',
  message: 'termsOfService must be a string',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'termsOfService',
  data: {},
  targetSpecs: OpenAPI2,
};

export default termsOfServiceTypeLint;
