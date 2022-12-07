import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const propertiesTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_PROPERTIES_OBJECT,
  source: 'apilint',
  message: 'properties must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['object'],
  marker: 'value',
  target: 'properties',
  data: {},
};

export default propertiesTypeLint;
