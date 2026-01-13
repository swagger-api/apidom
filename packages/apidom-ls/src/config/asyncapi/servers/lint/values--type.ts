import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const valuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVERS_VALUES_TYPE,
  source: 'apilint',
  message: 'Servers Object values must be of Server Object shape',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['server']],
  marker: 'key',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default valuesTypeLint;
