import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const infoRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_SWAGGER_FIELD_INFO_REQUIRED,
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
  targetSpecs: OpenAPI2,
};

export default infoRequiredLint;
