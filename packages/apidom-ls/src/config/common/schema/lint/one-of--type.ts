import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const oneOfTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ONEOF,
  source: 'apilint',
  message: 'oneOf must be a non-empty array of schemas',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['schema', 'boolean'], true],
  marker: 'key',
  target: 'oneOf',
  data: {},
};

export default oneOfTypeLint;
