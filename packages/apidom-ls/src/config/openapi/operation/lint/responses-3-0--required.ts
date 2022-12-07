import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const responsesRequired3_0Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OPERATION_FIELD_RESPONSES_REQUIRED,
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
  targetSpecs: [
    { namespace: 'openapi', version: '3.0.0' },
    { namespace: 'openapi', version: '3.0.1' },
    { namespace: 'openapi', version: '3.0.2' },
    { namespace: 'openapi', version: '3.0.3' },
  ],
};

export default responsesRequired3_0Lint;
