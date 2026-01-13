import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const infoTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_ASYNC_API_FIELD_INFO_TYPE,
  source: 'apilint',
  message: 'info must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['info']],
  marker: 'value',
  target: 'info',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default infoTypeLint;
