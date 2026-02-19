import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const infoRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_OPEN_API_FIELD_INFO_TYPE_REQUIRED,
  source: 'apilint',
  message: "should always have an 'info' section",
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
  targetSpecs: OpenAPI32,
};

export default infoRequiredLint;
