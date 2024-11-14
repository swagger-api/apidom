import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const valuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_HEADERS_VALUES_TYPE,
  source: 'apilint',
  message: 'Headers Object values must be of Header Object shape',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['header']],
  marker: 'key',
  data: {},
  targetSpecs: OpenAPI2,
};

export default valuesTypeLint;
