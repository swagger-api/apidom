import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const pathsRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_SWAGGER_FIELD_PATHS_REQUIRED,
  source: 'apilint',
  message: "should always have a 'paths' section",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['paths'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'paths' section",
        action: 'addChild',
        snippetYaml: 'paths: \n  \n',
        snippetJson: '"paths": {\n  \n  },\n',
      },
    ],
  },
  targetSpecs: OpenAPI2,
};

export default pathsRequiredLint;
