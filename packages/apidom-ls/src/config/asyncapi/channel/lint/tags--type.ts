import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const tagsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_CHANNEL_FIELD_TAGS_TYPE,
  source: 'apilint',
  message: 'tags must be an array of Tags',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['tags']],
  marker: 'key',
  markerTarget: 'tags',
  target: 'tags',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default tagsTypeLint;
