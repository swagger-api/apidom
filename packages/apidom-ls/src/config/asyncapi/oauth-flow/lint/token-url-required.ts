import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const oAuthFlowTokenUrlRequiredLint: LinterMeta = {
  code: ApilintCodes.OAUTH_FLOW_TOKEN_URL_REQUIRED,
  source: 'apilint',
  message: "should always have a 'tokenUrl'",
  severity: 1,
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
};

export default oAuthFlowTokenUrlRequiredLint;
