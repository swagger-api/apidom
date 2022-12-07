import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const writeOnlyTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_WRITEONLY,
  source: 'apilint',
  message: 'writeOnly must be a boolean',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'writeOnly',
  data: {},
};

export default writeOnlyTypeLint;
