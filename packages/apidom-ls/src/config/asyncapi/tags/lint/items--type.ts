import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const itemsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_TAGS_ITEMS_TYPE,
  source: 'apilint',
  message: 'Tags Object items must be of Tag Object shape',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['tag']],
  marker: 'key',
  data: {},
};

export default itemsTypeLint;
