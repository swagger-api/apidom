import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI3 } from '../../target-specs.ts';

const prefixTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_XML_FIELD_PREFIX_TYPE,
  source: 'apilint',
  message: 'prefix must be a string',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'prefix',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default prefixTypeLint;
