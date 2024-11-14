import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const maximumTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_ITEMS_FIELD_MAXIMUM_TYPE,
  source: 'apilint',
  message: 'maximum must be a number',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['number'],
  marker: 'value',
  target: 'maximum',
  data: {},
  targetSpecs: OpenAPI2,
};

export default maximumTypeLint;
