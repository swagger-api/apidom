import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const infoRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_ASYNC_API_FIELD_INFO_REQUIRED,
  source: 'apilint',
  message: "should always have a 'info' section",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['info'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'info' section",
        action: 'addChild',
        snippetYaml: 'info: \n  \n',
        snippetJson: '"info": {\n  \n  },\n',
      },
    ],
  },
  targetSpecs: AsyncAPI3,
};

export default infoRequiredLint;
