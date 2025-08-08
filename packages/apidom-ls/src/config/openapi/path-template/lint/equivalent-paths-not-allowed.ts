import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const equivalentPathsNotAllowedLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PATH_TEMPLATE_EQUIVALENT_NOT_ALLOWED,
  source: 'apilint',
  message: 'Equivalent paths are not allowed.',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintNoEquivalentPaths',
  marker: 'value',
  targetSpecs: [...OpenAPI2],
};

export default equivalentPathsNotAllowedLint;
