import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const oAuthFlowScopesRequiredLint: LinterMeta = {
  code: ApilintCodes.OAUTH_FLOW_SCOPES_REQUIRED,
  source: 'apilint',
  message: "should always have a 'scopes'",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['scopes'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'scopes' field",
        action: 'addChild',
        snippetYaml: 'scopes: \n  ',
        snippetJson: '"scopes": {},\n    ',
      },
    ],
  },
};

export default oAuthFlowScopesRequiredLint;
