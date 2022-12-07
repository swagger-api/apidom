import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const nameRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_TAG_FIELD_NAME_REQUIRED,
  source: 'apilint',
  message: "should always have a 'name'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['name'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'name' field",
        action: 'addChild',
        snippetYaml: 'name: \n  ',
        snippetJson: '"name": "",\n    ',
      },
    ],
  },
};

export default nameRequiredLint;
