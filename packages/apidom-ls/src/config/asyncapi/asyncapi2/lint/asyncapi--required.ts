import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const asyncapiRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_ASYNC_API_FIELD_ASYNCAPI_REQUIRED,
  source: 'apilint',
  message: "should always have a 'asyncapi' value",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['asyncapi'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'asyncapi' section",
        action: 'addChild',
        snippetYaml: "asyncapi: ''\n",
        snippetJson: '"asyncapi": "",\n',
      },
    ],
  },
};

export default asyncapiRequiredLint;
