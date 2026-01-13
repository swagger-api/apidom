import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const examplesItemsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_FIELD_EXAMPLES_ITEMS_TYPE,
  source: 'apilint',
  message: "'examples' must be an array of Message Example Objects",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['messageExample']],
  marker: 'key',
  target: 'examples',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default examplesItemsTypeLint;
