import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

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
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default tagsTypeLint;
