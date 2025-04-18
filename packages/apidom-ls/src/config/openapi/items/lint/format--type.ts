import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const formatTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_ITEMS_FIELD_FORMAT_TYPE,
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
