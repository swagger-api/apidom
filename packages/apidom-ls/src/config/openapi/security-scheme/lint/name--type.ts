import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI3 } from '../../target-specs';

const nameTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_SECURITY_SCHEME_FIELD_NAME_TYPE,
  source: 'apilint',
  message: 'name must be a string',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'name',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default nameTypeLint;
