import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const urlRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_EXTERNAL_DOCUMENTATION_FIELD_URL_REQUIRED,
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
  targetSpecs: OpenAPI3,
};

export default urlRequiredLint;
