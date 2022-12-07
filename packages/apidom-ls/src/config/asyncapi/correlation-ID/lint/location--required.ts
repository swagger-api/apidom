import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const locationRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CORRELATION_ID_FIELD_LOCATION_REQUIRED,
  source: 'apilint',
  message: "should always have a 'location'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['location'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'location' field",
        action: 'addChild',
        snippetYaml: 'location: \n  ',
        snippetJson: '"location": "",\n    ',
      },
    ],
  },
};

export default locationRequiredLint;
