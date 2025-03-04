import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const valuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVERS_VALUES_TYPE,
  source: 'apilint',
  message: 'Servers Object values must be of Server Object shape',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['server']],
  marker: 'key',
  data: {},
};

export default valuesTypeLint;
