import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const asyncapiRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_ASYNC_API_FIELD_ASYNCAPI_REQUIRED,
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
  targetSpecs: AsyncAPI3,
};

export default asyncapiRequiredLint;
