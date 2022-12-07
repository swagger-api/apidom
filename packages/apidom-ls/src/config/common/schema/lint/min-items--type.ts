import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const minItemsTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_MINITEMS,
  source: 'apilint',
  message: 'minItems must be a non-negative integer',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintNumber',
  linterParams: [true, true, true],
  marker: 'value',
  target: 'minItems',
  data: {},
};

export default minItemsTypeLint;
