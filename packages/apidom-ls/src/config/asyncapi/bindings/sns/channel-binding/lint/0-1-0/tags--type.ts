import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../../../../target-specs.ts';

const tagsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SNS_CHANNEL_BINDING_FIELD_TAGS_TYPE,
  source: 'apilint',
  message: "'tags' value must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['object'],
  marker: 'value',
  target: 'tags',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
  ],
  targetSpecs: AsyncAPI2,
};

export default tagsTypeLint;
