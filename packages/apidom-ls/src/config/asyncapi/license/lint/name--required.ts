import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const nameRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_LICENSE_FIELD_NAME_REQUIRED,
  source: 'apilint',
  message: "should always have a 'name' value",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['name'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'name' section",
        action: 'addChild',
        snippetYaml: 'name: \n    ',
        snippetJson: '"name": "",\n      ',
      },
    ],
  },
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default nameRequiredLint;
