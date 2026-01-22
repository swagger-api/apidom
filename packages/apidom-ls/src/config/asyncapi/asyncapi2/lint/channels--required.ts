import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../target-specs.ts';

const channelsRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_ASYNC_API_FIELD_CHANNELS_REQUIRED,
  source: 'apilint',
  message: "should always have a 'channels' section",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['channels'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'channels' section",
        action: 'addChild',
        snippetYaml: 'channels: \n  \n',
        snippetJson: '"channels": {\n  \n  },\n',
      },
    ],
  },
  targetSpecs: AsyncAPI2,
};

export default channelsRequiredLint;
