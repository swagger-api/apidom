import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const serversValuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_COMPONENTS_FIELD_SERVERS_VALUES_TYPE,
  source: 'apilint',
  message: '"servers" values must be Server object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['server']],
  marker: 'key',
  markerTarget: 'servers',
  target: 'servers',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default serversValuesTypeLint;
