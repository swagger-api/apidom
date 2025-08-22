import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI30 } from '../../target-specs.ts';

const valueTypeArrayLint: LinterMeta = {
  code: ApilintCodes.SECURITY_REQUIREMENT_ARRAY,
  source: 'apilint',
  message: 'must be an array',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfType',
  linterParams: ['array'],
  targetSpecs: [...OpenAPI2, ...OpenAPI30],
};

export default valueTypeArrayLint;
