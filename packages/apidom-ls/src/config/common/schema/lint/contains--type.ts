import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const containsTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_CONTAINS,
  source: 'apilint',
  message: 'contains must be a schema',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['schema', 'boolean'],
  marker: 'value',
  target: 'contains',
  data: {},
};

export default containsTypeLint;
