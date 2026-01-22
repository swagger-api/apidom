import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const channelsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_ASYNC_API_FIELD_CHANNELS_TYPE,
  source: 'apilint',
  message: 'channels must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['channels']],
  marker: 'value',
  target: 'channels',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default channelsTypeLint;
