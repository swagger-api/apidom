import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const typeRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_ITEMS_FIELD_TYPE_REQUIRED,
  source: 'apilint',
  message: "should always have a 'type'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['type'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'type' field",
        action: 'addChild',
        snippetYaml: 'type: \n  ',
        snippetJson: '"type": ,\n    ',
      },
    ],
  },
  targetSpecs: OpenAPI2,
};

export default typeRequiredLint;
