import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI } from '../../target-specs';

const nameTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_CONTACT_FIELD_NAME_TYPE,
  source: 'apilint',
  message: "'name' must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'name',
  data: {},
  targetSpecs: OpenAPI,
};

export default nameTypeLint;
