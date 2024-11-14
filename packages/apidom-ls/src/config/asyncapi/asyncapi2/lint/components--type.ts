import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const componentsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_ASYNC_API_FIELD_COMPONENTS_TYPE,
  source: 'apilint',
  message: 'components must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['components']],
  marker: 'value',
  target: 'components',
  data: {},
};

export default componentsTypeLint;
