import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const minPropertiesTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_MINPROPERTIES,
  source: 'apilint',
  message: 'minProperties must be a non-negative integer',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintNumber',
  linterParams: [true, true, true],
  marker: 'value',
  target: 'minProperties',
  data: {},
};

export default minPropertiesTypeLint;
