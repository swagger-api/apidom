import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const tagsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_TRAIT_FIELD_TAGS_TYPE,
  source: 'apilint',
  message: 'tags must be an array',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['tags']],
  marker: 'key',
  markerTarget: 'tags',
  target: 'tags',
  data: {},
};

export default tagsTypeLint;
