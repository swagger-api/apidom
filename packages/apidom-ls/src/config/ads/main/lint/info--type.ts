import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const infoTypeLint: LinterMeta = {
  code: ApilintCodes.ADS_MAIN_FIELD_INFO_TYPE,
  source: 'apilint',
  message: 'info must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['info']],
  marker: 'value',
  target: 'info',
  data: {},
};

export default infoTypeLint;
