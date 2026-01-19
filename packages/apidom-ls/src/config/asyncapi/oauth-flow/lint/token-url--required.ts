import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const tokenUrlRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OAUTH_FLOW_FIELD_TOKEN_URL_REQUIRED,
  source: 'apilint',
  message: "should always have a 'tokenUrl'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['tokenUrl'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'tokenUrl' field",
        action: 'addChild',
        snippetYaml: 'tokenUrl: \n  ',
        snippetJson: '"tokenUrl": "",\n    ',
      },
    ],
  },
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default tokenUrlRequiredLint;
