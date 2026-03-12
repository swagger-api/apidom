import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI31, OpenAPI32 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const summary3_1__3_2TypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_REFERENCE_FIELD_SUMMARY_TYPE,
  source: 'apilint',
  message: 'summary must be a string',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'summary',
  data: {},
  targetSpecs: [...OpenAPI31, ...OpenAPI32],
};

export default summary3_1__3_2TypeLint;
