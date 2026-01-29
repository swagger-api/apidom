import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const authorizationUrlRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OAUTH_FLOW_FIELD_AUTHORIZATION_URL_REQUIRED,
  source: 'apilint',
  message: "should always have a 'authorizationUrl'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['authorizationUrl'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'authorizationUrl' field",
        action: 'addChild',
        snippetYaml: 'authorizationUrl: \n  ',
        snippetJson: '"authorizationUrl": "",\n    ',
      },
    ],
  },
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default authorizationUrlRequiredLint;
