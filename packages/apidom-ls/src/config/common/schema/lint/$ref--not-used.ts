import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI30 } from '../../../openapi/target-specs.ts';

const $refNotUsedLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_REFERENCE_NOT_USED,
  source: 'apilint',
  message: 'Definition was declared but never used in document',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'apilintReferenceNotUsed',
  linterParams: ['string'],
  marker: 'key',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI30],
};

export default $refNotUsedLint;
