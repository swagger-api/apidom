import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const readOnlyTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_READONLY,
  source: 'apilint',
  message: 'readOnly must be a boolean',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'readOnly',
  data: {},
};

export default readOnlyTypeLint;
