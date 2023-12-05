import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI30 } from '../../target-specs';

const pathsRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OPEN_API_FIELD_PATHS_REQUIRED,
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
  targetSpecs: OpenAPI30,
};

export default pathsRequiredLint;
