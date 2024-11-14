import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const tagsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_FIELD_TAGS_TYPE,
  source: 'apilint',
  message: 'tags must be an array of Tags',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['tags']],
  marker: 'key',
  target: 'tags',
  data: {},
};

export default tagsTypeLint;
