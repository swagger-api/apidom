import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI30 } from '../../target-specs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const responsesRequired2_0__3_0Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_OPERATION_FIELD_RESPONSES_REQUIRED,
  source: 'apilint',
  message: "should always have a 'responses'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['responses'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'responses' field",
        action: 'addChild',
        snippetYaml: 'responses: \n  ',
        snippetJson: '"responses": {},\n    ',
      },
    ],
  },
  targetSpecs: [...OpenAPI2, ...OpenAPI30],
};

export default responsesRequired2_0__3_0Lint;
