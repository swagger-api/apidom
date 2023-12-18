import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const propertyNamesTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_PROPERTYNAMES,
  source: 'apilint',
  message: 'propertyNames must be a schema',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['schema', 'boolean'],
  marker: 'value',
  target: 'propertyNames',
  data: {},
};

export default propertyNamesTypeLint;
