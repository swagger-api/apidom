import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const examplesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_TRAIT_FIELD_EXAMPLES_TYPE,
  source: 'apilint',
  message: "'examples' must be an array of Message Example Objects",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['message-trait-examples']],
  marker: 'key',
  target: 'examples',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default examplesTypeLint;
