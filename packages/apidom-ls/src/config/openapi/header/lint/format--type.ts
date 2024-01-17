import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const formatTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_HEADER_FIELD_FORMAT_TYPE,
  source: 'apilint',
  message: 'format must be a string',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'format',
  data: {},
  targetSpecs: OpenAPI2,
};

export default formatTypeLint;
