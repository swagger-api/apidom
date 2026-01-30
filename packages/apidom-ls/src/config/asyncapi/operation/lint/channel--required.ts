import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const channelRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_OPERATION_FIELD_CHANNEL_REQUIRED,
  source: 'apilint',
  message: "should always have a 'channel'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['channel'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'channel' field",
        action: 'addChild',
        snippetYaml: 'channel: \n  ',
        snippetJson: '"channel": {\n  \n},\n',
      },
    ],
  },
  targetSpecs: AsyncAPI3,
};

export default channelRequiredLint;
