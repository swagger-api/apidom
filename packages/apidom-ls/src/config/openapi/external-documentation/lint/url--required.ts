import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI3 } from '../../target-specs';

const urlRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_EXTERNAL_DOCUMENTATION_FIELD_URL_REQUIRED,
  source: 'apilint',
  message: "should always have an 'url'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['url'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'url' field",
        action: 'addChild',
        snippetYaml: 'url: \n  ',
        snippetJson: '"url": "",\n    ',
      },
    ],
  },
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default urlRequiredLint;
